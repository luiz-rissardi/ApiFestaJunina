import { DateFormat, loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { orderEntity } from "../../util/entity/TypesOfSchema.js";

export class OrderService extends ValidateFieldsTemplateMethod {
    #repository
    constructor({ repository }) {
        super({ typeOfSchema: orderEntity })
        this.#repository = repository;
    }

    async findBetweenDate(initialDate, endedDate) {
        try {
            if (this.validate("dateOfCreate", initialDate) && this.validate("dateOfCreate", endedDate)) {
                const data = await this.#repository.findBetweenDate(initialDate, endedDate);
                return data;
            } else {
                loggers.warn(`OrderController => findBetweenDate => falho ao validar as datas ${this.mesageErrors}`);
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error(`OrderController => findBetweenDate => erro ao pegar vendas entre duas datas ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async countTotalOrders() {
        try {
            const count = await this.#repository.count();
            return count
        } catch (error) {
            loggers.error(`OrderController => countTotalOrders => erro ao pegar o total de vendas ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async createOrder(orderId,commandId) {
        try {
            const dateOfCreate = DateFormat(new Date());
            const orderExists = (await this.#repository.getOne(orderId)).length
            if (orderExists == 0) {
                await this.#repository.insertOne(dateOfCreate, orderId,commandId);
                return {
                    message: "venda criada com sucesso!",
                    type: "valid",
                    orderId
                }
            }else{
                return {
                    message: "venda criada com sucesso!",
                    type: "valid",
                    orderId
                }
            }
        } catch (error) {
            loggers.error(`OrderController => createOrder => erro ao criar uma nova venda ${error.message}`);
            throw new Error("não foi possivel criar venda!")
        }
    }
}
