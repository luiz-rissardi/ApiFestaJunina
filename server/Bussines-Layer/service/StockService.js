
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
            const products = await this.#repository.findAll();
            return products
        } catch (error) {
            loggers.error(`Stock => findAllProductsInStock => erro ao buscar os dados ${error.message}`)
            throw new Error("não foi possivel buscar os dados");
        }
    }

    async updateProduct(productId, product) {
        try {
            product.price = Number(product?.price)
            product.quantity = Number(product?.quantity)
            if (this.#validateProduct(product)) {
                await this.#repository.updateOne(productId, product);
                return {
                    message: "produto atualizado com sucesso",
                    type: "valid"
                }
            } else {
                loggers.error(`Stock => updateProduct => Validação de produto falhou ${this.mesageErrors}`);
                return {
                    message: "Produto inválido. Verifique os dados fornecidos.",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`Stock => updateProduct => erro ao atualizar os dados ${error.message}`)
            throw new Error("não foi possivel atualizar o produto")
        }
    }

    async createProduct(product) {
        try {
            product.price = Number(product.price)
            product.quantity = Number(product.quantity)
            if (this.#validateProduct(product)) {
                await this.#repository.insertOne(product)
                return {
                    message: "produto salvo com sucesso",
                    type: "valid"
                }
            } else {
                loggers.error(`Stock => createProduct => Validação do produto falhou ${this.mesageErrors}`)
                return {
                    message: "Produto inválido. Verifique os dados fornecidos.",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`Stock => createProduct => erro ao criar um produto ${error.message}`)
            throw new Error("não foi possivel createProduct o produto")
        }
    }

    #validateProduct(product) {
        return !Object.keys(product).map(key => {
            return this.validate(key, product[key])
        }).includes(false)
    }
}
