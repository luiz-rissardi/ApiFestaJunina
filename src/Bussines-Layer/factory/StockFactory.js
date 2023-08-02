import { StokService } from "../service/StockService.js";
import { StockRepository } from "../../Acess-Layer/repository/StockRepository.js";
import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { loggers } from "../../helpers/helper.js";


export class StockFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING)
            const repository = new StockRepository({ connection })
            return new StokService({ repository })
        } catch (error) {
            loggers.error(error);
            throw new Error("não doi possivel criar StockService")
        }
    }
}