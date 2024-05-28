import { s3 } from "../config/awsConfig.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mysql from "mysql";

export default class ReservationService {
  constructor() {
    this.db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });

    this.s3Client = new S3Client({ region: process.env.AWS_REGION });

    this.db.query(
      `CREATE TABLE IF NOT EXISTS reservations (
              id INT AUTO_INCREMENT PRIMARY KEY,
              roomName VARCHAR(255) NOT NULL,
              roomPhoto VARCHAR(255),
              roomLocation VARCHAR(255) NOT NULL,
              dateOfUse DATE NOT NULL,
              startTime TIME NOT NULL,
              endTime TIME NOT NULL,
              responsible VARCHAR(255) NOT NULL,
              reason TEXT,
              additionalInfo TEXT,
              guests TEXT
          );`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela de reservas:", err);
          return;
        }
        console.log("Tabela de reservas criada com sucesso.");
      }
    );
  }

  async create(req, res) {
    try {
      const roomPhoto = req.file ? req.file.location : "";
      const {
        roomName,
        roomLocation,
        dateOfUse,
        startTime,
        endTime,
        responsible,
        reason,
        additionalInfo,
        guests,
      } = req.body;
      const reservation = {
        roomName,
        roomPhoto,
        roomLocation,
        dateOfUse,
        startTime,
        endTime,
        responsible,
        reason,
        additionalInfo,
        guests,
      };

      const query = "INSERT INTO reservations SET ?";
      this.db.query(query, reservation, async (err, result) => {
        if (err) {
          console.error("Erro ao criar reserva:", err);
          return res.status(500).send({ message: "Erro ao criar reserva" });
        }

        const params = {
          Bucket: process.env.AWS_S3_BUCKET_NAME,
          Key: `so3_reservations_gustavo/${result.insertId}/${req.file.originalname}`,
          Body: req.file.buffer,
        };

        await this.s3Client.send(new PutObjectCommand(params));

        const roomPhotoUrl = `https://s3.${process.env.AWS_REGION}.amazonaws.com/${process.env.AWS_S3_BUCKET_NAME}/so3_reservations_gustavo/${result.insertId}/${req.file.originalname}`;

        this.db.query(
          "UPDATE reservations SET roomPhoto = ? WHERE id = ?",
          [roomPhotoUrl, result.insertId],
          (updateErr) => {
            if (updateErr) {
              console.error("Erro ao atualizar reserva:", updateErr);
              return res
                .status(500)
                .send({ message: "Erro ao atualizar reserva" });
            }
          }
        );

        console.log("Reserva criada com sucesso");
        return res.status(200).send({ message: "Reserva criada com sucesso" });
      });

      console.log("Requisição de reserva processada:", reservation);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      return res.status(500).send({ message: "Erro interno" });
    }
  }

  async getAll(req, res) {
    const query = "SELECT * FROM reservations";
    this.db.query(query, (err, result) => {
      if (err) {
        console.error("Erro ao buscar reservas:", err);
        res.status(500).send({ message: "Erro ao buscar reservas" });
        return;
      }
      res.send(result);
    });
  }

  async delete(req, res) {
    const { id } = req.params;
    const deleteQuery = "DELETE FROM reservations WHERE id = ?";
    this.db.query(deleteQuery, [id], (deleteDbErr, deleteDbResult) => {
      if (deleteDbErr) {
        console.error("Erro ao deletar reserva:", deleteDbErr);
        return res.status(500).send({ message: "Erro ao deletar reserva" });
      }
      res.send({
        message: "Reserva e foto associada deletadas com sucesso",
      });
    });
  }
}
