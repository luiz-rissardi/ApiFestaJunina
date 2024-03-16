import { UserService  } from "./UserService.js";
import { UserRepository } from "./UserRepository.js";
import { MySqlDatabase } from "../../data/MySqlDataBase.js";
import { UserController } from "./UserController.js";

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

