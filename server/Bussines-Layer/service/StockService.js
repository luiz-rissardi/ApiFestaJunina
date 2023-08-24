
import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../util/TemplateMethods/ValidadetFileds.js";
import { StockEntity } from "../util/entity/TypesOfSchema.js"

export class StockService extends ValidateFieldsTemplateMethod {
    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: StockEntity });
        this.#repository = repository;
    }

    async findAllProductsInStock() {
        try {
            const produts = await this.#repository.findAll();
            return produts
        } catch (error) {
            loggers.error("Stock => findAllProductsInStock => ", error)
            throw new Error("não foi possivel buscar os dados");
        }
    }

    async updateProduct(productId, product) {
        try {
            product.price = Number(product?.price)
            product.quantity = Number(product?.quantity)
            if (this.#validateProduct(product)) {
                await this.#repository.updateOne(productId,product);
                return "produto atualizado com sucesso"
            } else {
                loggers.error(`Stock => updateProduct => ${this.mesageErrors}`)
                throw new Error("valor invalido");
            }
        } catch (error) {
            loggers.error("Stock => updateProduct => ", error)
            throw new Error("não foi possivel atualizar o produto")
        }
    }

    async createProduct(product) {
        try {
            product.price = Number(product?.price)
            product.quantity = Number(product?.quantity)
            if (this.#validateProduct(product)) {
                await this.#repository.insertOne(product)
                return "produto salvo com sucesso!";
            }else{
            loggers.error(`Stock => createProduct => ${this.mesageErrors}`)
                return "produto invalido";
            }
        } catch (error) {
            loggers.error("Stock => createProduct => ", error)
            throw new Error("não foi possivel createProduct o produto")
        }
    }

    #validateProduct(product) {
        return !Object.keys(product).map(key => {
            return this.validate(key, product[key])
        }).includes(false)
    }
}
