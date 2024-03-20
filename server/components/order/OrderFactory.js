import { OrderRepository } from "./OrderRepository.js";
import { OrderService } from "./OrderService.js";
import { MySqlDatabase } from "../../data/MySqlDataBase.js";
import { OrderController } from "./OrderController.js";
import configEnv from "../../helpers/config.js";

export class OrderFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(configEnv.CONNECTION_STRING);
            const repository = new OrderRepository({ connection });
            const service = new OrderService({ repository });
            return new OrderController({ service });
        } catch (error) {
            throw new Error("não foi possivle criar OrderController")
        }
    }
}