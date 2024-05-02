import { Router } from "express";
import ReservationController from "../controllers/ReservationController.js";


const ReservationRouter = Router()


ReservationRouter.post('/create', (req, res) => {
    const controller = new ReservationController();
    controller.create(req, res);
})


ReservationRouter.get('/getAll', (req, res) => {
    const controller = new ReservationController();
    controller.getAll(req, res);
    
})
ReservationRouter.delete('/delete/:id', (req, res) => {
    const controller = new ReservationController();
    controller.delete(req, res);
})





export default ReservationRouter


