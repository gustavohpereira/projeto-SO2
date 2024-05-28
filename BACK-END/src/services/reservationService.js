import mysql from "mysql2";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  }
});

const upload = multer({ storage: storage });

export default class ReservationService {
  constructor() {
    this.db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
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
      upload.single('roomPhoto')(req, res, (err) => {
        if (err) {
          console.error("Erro ao fazer upload da imagem:", err);
          return res.status(500).send({ message: "Erro ao fazer upload da imagem" });
        }

        const roomPhoto = req.file ? req.file.path : null;
        console.log(roomPhoto)
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
        this.db.query(query, reservation, (err, result) => {
          if (err) {
            console.error("Erro ao criar reserva:", err);
            return res.status(500).send({ message: "Erro ao criar reserva" });
          }
          console.log("Reserva criada com sucesso");
          return res.status(200).send({ message: "Reserva criada com sucesso" });
        });

        console.log("Requisição de reserva processada:", reservation);
      });
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

  async delete (req, res) {
    const { id } = req.params;
    const query = "DELETE FROM reservations WHERE id = ?";
    this.db.query(query, [id], (err, result) => {
      if (err) {
        console.error("Erro ao deletar reserva:", err);
        res.status(500).send({ message: "Erro ao deletar reserva" });
        return;
      }
      res.send({ message: "Reserva deletada com sucesso" });
    });
  }
}