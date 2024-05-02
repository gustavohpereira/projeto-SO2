import ReservationService from "../services/reservationService.js";


export default class ReservationController {

     constructor() {
        this.reservationService = new ReservationService();
    }

    async create(req, res) {
        this.reservationService.create(req, res);
    }

    async getAll(req, res) {
        const reservations = this.reservationService.getAll(req, res);
    }

    async delete(req,res){
        this.reservationService.delete(req, res);
    }
}