import { MySqlDatabase } from "../../data/MySqlDataBase.js";
import { OrderProdutsRepository } from "./OrderProdutsRepository.js";
import { OrderProdutsService } from "./OrderProdutsService.js";
import { OrderProdutsController } from "./OrderProdutsController.js";
import configEnv from "../../helpers/config.js";

export class OrderProdutsFactory {
    static createInstance() {
        try {
            const connection = MySqlDatabase.build(configEnv.CONNECTION_STRING);
            const repository = new OrderProdutsRepository({ connection });
            const service = new OrderProdutsService({ repository });
            return new OrderProdutsController({ service });
        } catch (error) {
            throw new Error("não foi possivel construir o OrderProductsController");
        }
    }
}