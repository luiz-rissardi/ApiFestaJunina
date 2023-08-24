import { MySqlDatabase } from "../../Acess-Layer/data/MySqlDataBase.js";
import { ProductSalesRepository } from "../../Acess-Layer/repository/ProductSalesRepository.js";
import { ProductSalesService } from "../service/ProductSalesService.js";
import { ProductSalesController } from "../../Presentation-Layer/controller/ProductSalesController.js";

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