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

    async createOrder(orderId, commandId) {
        try {
            const dateOfCreate = DateFormat(new Date());
            const orderExists = (await this.#repository.getOne(orderId)).length
            if (orderExists == 0) {
                await this.#repository.insertOne(dateOfCreate, orderId, commandId);
                return {
                    message: "venda criada com sucesso!",
                    type: "valid",
                    orderId
                }
            } else {
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

    async inativeOrder(commandId) {
        try {
            this.#repository.inativeOrder(commandId);
            return;
        } catch (error) {
            loggers.error(`OrderController => updateOrder => erro ao atualizar a venda ${error.message}`);
            throw new Error("não foi possivel atualizar a venda!")
        }
    }

    async putCommandIdIntoOrder(orderId, newCommandId) {
        try {
            const oldCommandId = (await this.#repository.getOne(orderId))[0].commandId;
            
            if(oldCommandId){
                await this.#repository.putOne(orderId,newCommandId);
                return {
                    type:"valid",
                    message:"comanda atualizada com sucesso",
                    oldCommandId
                }
            }else{
                return {
                    type:"invalid",
                    message:"não foi possivel atualizar comanda"
                }
            }
        } catch (error) {
            loggers.error(`OrderController => putCommandIdIntoOrder => erro ao atualizar a venda ${error.message}`);
            throw new Error("não foi possivel atualizar a venda!")
        }
    }

    async findCommandByCommandId(commandId){
        try {
            commandId = Number(commandId);
            if(this.validate("commandId",commandId)){
                const order = await this.#repository.getOneByCommandId(commandId);
                return order;
            }else{
                loggers.warn(this.mesageErrors)
                return {
                    message:"comanda invalida",
                    type:"invalid"
                }
            }
        } catch (error) {
            loggers.error(`OrderController => getCommandByCommandId => erro ao pegar a venda ${error.message}`);
            throw new Error("não foi possivel pegar a venda!")
        }
    }
}
