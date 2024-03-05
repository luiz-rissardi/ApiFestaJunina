import { MySqlDatabase } from "../data/MySqlDataBase.js";
import { ProductSalesRepository } from "./ProductSalesRepository.js";
import { ProductSalesService } from "./ProductSalesService.js";
import { ProductSalesController } from "./ProductSalesController.js";

export class ProductSalesFactory {
    static createInstance() {
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
            const repository = new ProductSalesRepository({ connection });
            const service = new ProductSalesService({ repository });
            return new ProductSalesController({ service });
        } catch (error) {
            throw new Error("não foi possivel construir o ProductSevrice");
        }
    }
}