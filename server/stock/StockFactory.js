import { StockService } from "./StockService.js";
import { StockRepository } from "./StockRepository.js";
import { MySqlDatabase } from "../data/MySqlDataBase.js";
import { StockController } from "./StockController.js";

export class StockFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
            const repository = new StockRepository({ connection });
            const service = new StockService({ repository });
            return new StockController({ service });
        } catch (error) {
            throw new Error("não doi possivel criar StockService")
        }
    }
}