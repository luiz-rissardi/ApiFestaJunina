import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../util/TemplateMetods/ValidadetFileds.js";
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
                loggers.warn(this.mesageErrors);
                return "produto invalido"
            }
        } catch (error) {
            loggers.error(error)
            return "não foi possivel inserir os produtos a venda"
        }
    }

    async findTotalPriceOfSale(saleId) {
        try {
            if (this.validate("saleId", saleId)) {
                const [totalPirceOfSale] = await this.#repository.findTotalPiceOfSale(saleId);
                return totalPirceOfSale;
            }else{
                loggers.warn(this.mesageErrors)
                return "dados inválidos"
            }
        } catch (error) {
            loggers.error(error);
            return "não foi possivel buscar os dados da venda"
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