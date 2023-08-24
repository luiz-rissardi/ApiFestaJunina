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
                return "produtos inseridos com sucesso!"
            } else {
                loggers.warn(`ProductSales => insertProdutsIntoSale => ${this.mesageErrors}`);
                throw new Error("produto invalido")
            }
        } catch (error) {
            loggers.error("ProductSales => findSalesAfterDate =>",error)
            throw new Error("não foi possivel inserir os produtos a venda")
        }
    }

    async findTotalPriceOfSale(saleId) {
        try {
            if (this.validate("saleId", saleId)) {
                const totalPirceOfSale = await this.#repository.findTotalPriceOfSale(saleId);
                return totalPirceOfSale;
            }else{
                loggers.warn(`ProductSales => findTotalPriceOfSale => ${this.mesageErrors}`)
                throw new Error("dados inválidos");
            }
        } catch (error) {
            loggers.error("ProductSales => findTotalPriceOfSale =>",error);
            throw new Error("não foi possivel buscar os dados da venda")
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