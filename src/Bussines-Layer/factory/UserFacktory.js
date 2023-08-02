import { UserService  } from "../service/UserService.js";
import { UserRepository } from "../../Acess-Layer/repository/UserRepository.js";
import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { loggers } from "../../helpers/helper.js";


export class UserFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING)
            const repository = new UserRepository({ connection })
            return new UserService({ repository })
        } catch (error) {
            loggers.error(error);
            throw new Error("não doi possivel criar UserService")
        }
    }
}