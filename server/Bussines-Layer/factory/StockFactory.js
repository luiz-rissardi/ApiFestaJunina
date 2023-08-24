import { StockService } from "../service/StockService.js";
import { StockRepository } from "../../Acess-Layer/repository/StockRepository.js";
import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { StockController } from "../../Presentation-Layer/controller/StockController.js";

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