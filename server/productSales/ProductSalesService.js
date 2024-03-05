import { loggers } from "../helpers/helper.js";
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
                const data = this.#mappedProducts(products, saleId)
                data.map(async el => {
                    const alreadyExists = (await this.#repository.findOne(el.saleId, el.productId)).length != 0;
                    if (alreadyExists) {
                        await this.#repository.updateProductOne(el.saleId, el.productId, el.quantity, el.totalPrice)
                    } else {
                        await this.#repository.insertOne(el)
                    }
                })
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
                await this.#repository.updateQuantityOne(productId, saleId, quantity);
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
            loggers.error(`ProductSales => recordProductsSales => erro ao dar baixa nas vendas ${error.message}`);
            throw new Error("não foi possivel dar baixa nos productos da venda")
        }
    }

    async findProductsOfSale(saleId, productId) {
        try {
            productId = Number(productId);
            if (
                this.validate("saleId", saleId) &&
                this.validate("productId", productId)
            ) {
                return await this.#repository.findMany(saleId, productId);
            } else {
                loggers.error(`ProductSales => findProductsOfSale => erro ao buscar produtos das vendas ${this.mesageErrors}`)
                return {
                    message: "erro ao buscar produtos",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`ProductSales => findProductsOfSale => erro ao buscar produtos das vendas ${error.message}`)
            throw new Error("não foi possivel buscar produtos da venda")
        }
    }

    #mappedProducts(products, saleId) {
        return products.map(product => ({
            saleId,
            productId: product.productId,
            totalPrice: product.quantity * product.price,
            quantity: product.quantity
        }))
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