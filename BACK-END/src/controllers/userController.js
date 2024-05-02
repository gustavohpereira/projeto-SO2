import UserService from "../services/userService.js";


export default  class UserController{

    constructor() {
        this.userService = new UserService();
    }

    async create(req, res) {    
        this.userService.create(req, res);

    }

    async getAll(req, res) {
        this.userService.getAll(req, res);
    }


    async login(req, res) {
        this.userService.login(req, res);
    }

    async delete (req, res) {
        this.userService.delete(req, res);
    }


}