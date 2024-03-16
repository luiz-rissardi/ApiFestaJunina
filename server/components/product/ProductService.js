
import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { productEntity } from "../../util/entity/TypesOfSchema.js"

export class ProductService extends ValidateFieldsTemplateMethod {
    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: productEntity });
        this.#repository = repository;
    }

    async findAllProductsInProduct() {
        try {
            const products = await this.#repository.findAll();
            return products
        } catch (error) {
            loggers.error(`product => findAllProductsInproduct => erro ao buscar os dados ${error.message}`)
            throw new Error("não foi possivel buscar os dados");
        }
    }

    async updateProduct(productId, product) {
        try {
            product.price = Number(product?.price)
            product.quantity = Number(product?.quantity);
            product.active = Boolean(product.active);

            if (this.#validateProduct(product)) {
                await this.#repository.updateOne(productId, product);
                return {
                    message: "produto atualizado com sucesso",
                    type: "valid"
                }
            } else {
                loggers.error(`product => updateProduct => Validação de produto falhou ${this.mesageErrors}`);
                return {
                    message: "Produto inválido. Verifique os dados fornecidos.",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`product => updateProduct => erro ao atualizar os dados ${error.message}`)
            throw new Error("não foi possivel atualizar o produto")
        }
    }

    async substractionOfProduct(updates){
        try {
            this.#repository.substractionProduct(updates);
        } catch (error) {
            loggers.error(`product => substractionOfproduct => erro ao subtrair do estoque => ${error.message}`)
            throw new Error("não foi possivel subtrair do estoque")
        }
    }

    async createProduct(product) {
        try {
            product.price = Number(product.price)
            product.quantity = Number(product.quantity)
            if (this.#validateProduct(product) && product.price > 0) {
                const productId = await this.#repository.insertOne(product)
                return {
                    message: "produto salvo com sucesso",
                    type: "valid",
                    productId
                }
            } else {
                loggers.error(`product => createProduct => Validação do produto falhou ${this.mesageErrors}`)
                return {
                    message: "Produto inválido. Verifique os dados fornecidos.",
                    type: "invalid"
                }
            }
        } catch (error) {
            console.log(error);
            loggers.error(`product => createProduct => erro ao criar um produto ${error.message}`)
            throw new Error("não foi possivel createProduct o produto")
        }
    }

    #validateProduct(product) {
        return !Object.keys(product).map(key => {
            return this.validate(key, product[key])
        }).includes(false)
    }
}
