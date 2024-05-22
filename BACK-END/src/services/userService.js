import mysql from "mysql2";
import Reservation from "../models/reserv.model.js";
import {config} from 'dotenv'

export default class ReservationService {
  constructor() {

    config()

    this.db = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    this.db.query(
      `CREATE TABLE IF NOT EXISTS usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        senha VARCHAR(255)
    );`,
      (err) => {
        if (err) {
          console.error("Erro ao criar tabela de usuario:", err);
          return;
        }
      }
    );
  }

  async create(req, res) {
    try {
      const {
       nome,
        senha
      } = req.body;
      const usuario = {
        nome,
        senha
      };

      const query = "INSERT INTO usuario SET ?";
      this.db.query(query, usuario, (err, result) => {
        if (err) {
          console.error("Erro ao criar usuario:", err);
          res.status(500).send("Erro ao criar usuario");
          return;
        }
        console.log("usuario criada com sucesso");
        res.send("usuario criada com sucesso");
      });

      console.log("Requisição de usuario processada:", usuario);
    } catch (error) {
      console.error("Erro ao processar a requisição:", error);
      res.status(500).send("Erro interno");
    }
  }

  async getAll(req, res) {
    const query = "SELECT * FROM usuario";
    this.db.query(query, (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuario:", err);
        res.status(500).send("Erro ao buscar usuario");
        return;
      }
      res.send(result);
    });
  }


  async delete (req, res) {
    const { id } = req.params;
    const query = "DELETE FROM usuario WHERE id = ?";
    this.db.query(query, [id], (err, result) => {
      if (err) {
        console.log(id)
        console.error("Erro ao deletar usuario:", err);
        res.status(500).send("Erro ao deletar usuario");
        return;
      }
      res.send("usuario deletado com sucesso");
    });
  }


  async login(req, res) {
    const { nome, senha } = req.body;
    const query = "SELECT * FROM usuario WHERE nome = ? AND senha = ?";
    
    this.db.query(query, [nome, senha], (err, result) => {
      if (err) {
        console.error("Erro ao buscar usuário:", err);
        return res.status(500).json({ message: "Erro ao buscar usuário" });
      }
      
      if (result && result.length > 0) {
        return res.status(200).json({ message: "Login efetuado com sucesso" });
      } else {
        return res.status(401).json({ message: "Login falhou" });
      }
    });
  }
}
