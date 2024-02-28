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
                const data = products.map(product => [saleId, product.productId, product.quantity * product.price, product.quantity])
                await this.#repository.insertMany(data);
                return {
                    message: "produtos inseridos com sucesso!",
                    type: "valid"
                }
            }
        } catch (error) {
            loggers.error(`ProductSales => insertProdutsIntoSale => erro ao inserir produtos na venda ${error.message}`)
            throw new Error("não foi possivel inserir os produtos a venda")
        }
    }

    async recordProductsSales(saleId, quantity, productId) {
        try {
            if (
                this.validate("productId", productId) &
                this.validate("saleId", saleId) &
                this.validate("quantity", quantity)
            ) {
                await this.#repository.updateOne(productId, saleId, quantity);
                return {
                    message: "baixa realizada com sucesso",
                    type: "valid"
                }
            } else {
                loggers.warn(`ProductSales => recordProductsSales => falhou ao dar baixa em produtos ${this.mesageErrors}`);
                return {
                    message: "erro ao realizar baixa",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`ProductSales => recordProductsSales => erro ao dar baixa nas vendas`);
            throw new Error("não foi possivel dar baixa nos productos da venda")
        }
    }

    async findProductsOfSale(saleId,productId) {
        try {
            productId = Number(productId);
            if(
                this.validate("saleId",saleId) &&
                this.validate("productId",productId)
            ){
                return await this.#repository.findMany(saleId,productId);
            }else{
                loggers.error(`ProductSales => findProductsOfSale => erro ao buscar produtos das vendas ${this.mesageErrors}`)
                return {
                    message:"erro ao buscar produtos",
                    type:"invalid"
                }
            }
        } catch (error) {
            loggers.error(`ProductSales => findProductsOfSale => erro ao buscar produtos das vendas`)
            throw new Error("não foi possivel buscar produtos da venda")
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