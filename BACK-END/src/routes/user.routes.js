import { Router } from "express";
import UserController from "../controllers/userController.js";


const UserRouter = Router()
const controller = new UserController();


UserRouter.post('/create', (req, res) => {
    controller.create(req, res);
})


UserRouter.get('/getAll', (req, res) => {
    controller.getAll(req, res);
    
})

UserRouter.delete('/delete/:id', (req, res) => {
    controller.delete(req, res);
})


UserRouter.post('/login', (req, res) => {
    controller.login(req, res);
})


export default UserRouter


