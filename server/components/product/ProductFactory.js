import { ProductService } from "./ProductService.js";
import { ProductRepository } from "./productRepository.js";
import { MySqlDatabase } from "../../data/MySqlDataBase.js";
import { ProductController } from "./ProductController.js";
import configEnv from "../../helpers/config.js";

export class ProductFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(configEnv.CONNECTION_STRING);
            const repository = new ProductRepository({ connection });
            const service = new ProductService({ repository });
            return new ProductController({ service });
        } catch (error) {
            throw new Error("não doi possivel criar productController")
        }
    }
}