import { UserService  } from "../service/UserService.js";
import { UserRepository } from "../../Acess-Layer/repository/UserRepository.js";
import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { UserController } from "../../Presentation-Layer/controller/UserController.js";

export class UserFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
            const repository = new UserRepository({ connection });
            const service = new UserService({ repository });
            return new UserController({ service });
        } catch (error) {
            throw new Error("não doi possivel criar UserService")
        }
    }
}

