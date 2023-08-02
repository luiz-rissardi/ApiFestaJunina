import { ShoppingRepository } from "../../Acess-Layer/repository/ShoppingRepository.js";
import { ShoppingService } from "../service/ShoppingService.js";
import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { loggers } from "../../helpers/helper.js";


export class ShoppingFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING)
            const repository = new ShoppingRepository({ connection });
            return new ShoppingService({ repository });
        } catch (error) {
            loggers.error(error)
            throw new Error("não foi possivle criar ShoppingService")
        }
    }
}