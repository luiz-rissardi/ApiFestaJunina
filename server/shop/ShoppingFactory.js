import { ShoppingRepository } from "./ShoppingRepository.js";
import { ShoppingService } from "./ShoppingService.js";
import { MySqlDatabase } from "../data/MySqlDataBase.js";
import { ShoppingController } from "./ShoppingController.js";


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