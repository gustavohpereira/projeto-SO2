import { Router } from "express";
import ReservationController from "../controllers/ReservationController.js";
import multer from "multer";


const ReservationRouter = Router()

const upload = multer({
    storage: multer.memoryStorage(),
})


ReservationRouter.post('/create', upload.single('roomPhoto'), (req, res) => {
    const controller = new ReservationController();
    controller.create(req, res);
});


ReservationRouter.get('/getAll', (req, res) => {
    const controller = new ReservationController();
    controller.getAll(req, res);
    
})
ReservationRouter.delete('/delete/:id', (req, res) => {
    const controller = new ReservationController();
    controller.delete(req, res);
})





export default ReservationRouter


