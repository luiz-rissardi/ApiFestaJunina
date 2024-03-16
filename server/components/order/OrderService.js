import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { ordersEntity } from "../../util/entity/TypesOfSchema.js";


export class OrderService extends ValidateFieldsTemplateMethod {
    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: ordersEntity })
        this.#repository = repository
    }

    async insertProdutsIntoOrder(products, orderId) {
        try {
            if (this.#validateProducts(products) && this.validate("orderId", orderId)) {
                const data = this.#mappedProducts(products, orderId)
                data.map(async el => {
                    const alreadyExists = (await this.#repository.findOneProductOfOrder(el.orderId, el.productId)).length != 0;
                    if (alreadyExists) {
                        await this.#repository.updateProductOne(el.orderId, el.productId, el.quantity, el.totalPrice)
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
            loggers.error(`orders => insertProdutsIntoSale => erro ao inserir produtos na venda ${error.message}`)
            throw new Error("não foi possivel inserir os produtos a venda")
        }
    }

    async recordOrders(orderId, quantity, productId) {
        try {
            if (
                this.validate("productId", productId) &
                this.validate("orderId", orderId) &
                this.validate("quantity", quantity)
            ) {
                await this.#repository.updateQuantityOne(productId, orderId, quantity);
                return {
                    message: "baixa realizada com sucesso",
                    type: "valid"
                }
            } else {
                loggers.warn(`orders => recordProductsSales => falhou ao dar baixa em produtos ${this.mesageErrors}`);
                return {
                    message: "erro ao realizar baixa",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`orders => recordProductsSales => erro ao dar baixa nas vendas ${error.message}`);
            throw new Error("não foi possivel dar baixa nos productos da venda")
        }
    }

    async findOrder(orderId, productId) {
        try {
            productId = Number(productId);
            if (
                this.validate("orderId", orderId) &&
                this.validate("productId", productId)
            ) {
                return await this.#repository.findMany(orderId, productId);
            } else {
                loggers.error(`orders => findProductsOfSale => erro ao buscar produtos das vendas ${this.mesageErrors}`)
                return {
                    message: "erro ao buscar produtos",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`orders => findProductsOfSale => erro ao buscar produtos das vendas ${error.message}`)
            throw new Error("não foi possivel buscar produtos da venda")
        }
    }

    async findTopOrders(rank) {
        try {
            return await this.#repository.findTop(rank);
        } catch (error) {
            console.log(error);
            loggers.error(`orders => findTopOrders => erro ao buscar top 5 produtos vendidos ${error.message}`)
            throw new Error("não foi possivel buscar top 5 produtos vendidos")
        }
    }

    #mappedProducts(products, orderId) {
        return products.map(product => ({
            orderId,
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