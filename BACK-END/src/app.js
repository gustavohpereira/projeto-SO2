import Express from 'express';
import mysql from 'mysql2';
import dotenv from 'dotenv';
import ReservationRouter from './routes/reservation.routes.js';
import UserRouter from './routes/user.routes.js';
import cors from 'cors';

dotenv.config();
const app = Express();

app.use(Express.json());

// Configure CORS
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
},
    {
        origin: 'http://18.215.169.99:4200',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }
));

app.use('/user', UserRouter);
app.use('/reservation', ReservationRouter);

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão com o banco de dados estabelecida');
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});