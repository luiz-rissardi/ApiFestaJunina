import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../util/TemplateMethods/ValidadetFileds.js";
import { productSalesEntity } from "../util/entity/TypesOfSchema.js";


export class ProductSalesService extends ValidateFieldsTemplateMethod {
    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: productSalesEntity })
        this.#repository = repository
    }

    async insertProdutsIntoSale(products, saleId) {
        try {
            if (this.#validateProducts(products) && this.validate("saleId", saleId)) {
                const data = products.map(product => [ saleId, product.productId, product.quantity * product.price])
                await this.#repository.insertMany(data);
                return {
                    message:"produtos inseridos com sucesso!",
                    type:"valid"
                }
            } else {
                loggers.warn(`ProductSales => insertProdutsIntoSale => falhou ao validar produtos ${this.mesageErrors}`);
                return {
                    message:"produto invalido",
                    type:"invalid"
                }
            }
        } catch (error) {
            loggers.error(`ProductSales => findSalesAfterDate => erro ao inserir produtos na venda ${error.message}`)
            throw new Error("não foi possivel inserir os produtos a venda")
        }
    }

    #validateProducts(products) {
        return !products
            .map(product => {
                return Object.keys(product).map(key => {
                    return this.validate(key, product[key])
                })
            })
            .flatMap(el => el)
            .includes(false)
    }
}