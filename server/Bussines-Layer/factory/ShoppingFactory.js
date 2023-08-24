import { ShoppingRepository } from "../../Acess-Layer/repository/ShoppingRepository.js";
import { ShoppingService } from "../service/ShoppingService.js";
import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { ShoppingController } from "../../Presentation-Layer/controller/ShoppingController.js";


export class ShoppingFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
            const repository = new ShoppingRepository({ connection });
            const service = new ShoppingService({ repository });
            return new ShoppingController({ service });
        } catch (error) {
            throw new Error("não foi possivle criar ShoppingController")
        }
    }
}