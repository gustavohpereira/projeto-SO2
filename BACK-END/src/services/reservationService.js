import mysql from "mysql2";
import Reservation from "../models/reserv.model.js";

export default class ReservationService {
  constructor() {
    this.db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    this.db.query(
      `CREATE TABLE  IF NOT exists reservations (
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
      }
    );
  }

  async create(req, res) {
    try {
      const {
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
      this.db.query(query, reservation, (err, result) => {
        if (err) {
          console.error("Erro ao criar reserva:", err);
          res.status(500).send("Erro ao criar reserva");
          return;
        }
        console.log("Reserva criada com sucesso");
        res.send("Reserva criada com sucesso");
      });

      console.log("Requisição de reserva processada:", reservation);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      res.status(500).send("Erro interno");
    }
  }

  async getAll(req, res) {
    const query = "SELECT * FROM reservations";
    this.db.query(query, (err, result) => {
      if (err) {
        console.error("Erro ao buscar reservas:", err);
        res.status(500).send("Erro ao buscar reservas");
        return;
      }
      res.send(result);
    });
  }

  async delete (req, res) {
    const { id } = req.params;
    const query = "DELETE FROM reservations WHERE id = ?";
    this.db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erro ao deletar reserva:", err);
        res.status(500).send("Erro ao deletar reserva");
        return;
      }
      res.send("Reserva deletada com sucesso");
    });
  }
}
