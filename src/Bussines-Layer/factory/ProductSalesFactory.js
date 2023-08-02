import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { ProductSalesRepository } from "../../Acess-Layer/repository/ProductSalesRepository.js";
import { ProductSalesService } from "../service/ProductSalesService.js";
import { loggers } from "../../helpers/helper.js";

export class ProductSalesFactory {
    static createInstance() {
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING)
            const repository = new ProductSalesRepository({ connection });
            return new ProductSalesService({ repository })
        } catch (error) {
            throw new Error("não foi possivel construir o ProductSevrice");
        }
    }
}