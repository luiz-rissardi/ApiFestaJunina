import { DateFormat, loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { shoppingEntity } from "../../util/entity/TypesOfSchema.js";

export class ShoppingService extends ValidateFieldsTemplateMethod {
    #repository
    constructor({ repository }) {
        super({ typeOfSchema: shoppingEntity })
        this.#repository = repository;
    }

    async findBetweenDate(initialDate, endedDate) {
        try {
            if (this.validate("dateOfSale", initialDate) && this.validate("dateOfSale", endedDate)) {
                const data = await this.#repository.findBetweenDate(initialDate, endedDate);
                return data;
            } else {
                loggers.warn(`ShoppingController => findBetweenDate => falho ao validar as datas ${this.mesageErrors}`);
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error(`ShoppingController => findBetweenDate => erro ao pegar vendas entre duas datas ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async countTotalSales() {
        try {
            const count = await this.#repository.count();
            return count
        } catch (error) {
            loggers.error(`ShoppingController => countTotalSales => erro ao pegar o total de vendas ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async createSale(orderId) {
        try {
            const dateOfSale = DateFormat(new Date());
            await this.#repository.insertOne(dateOfSale,orderId);
            return {
                message: "venda criada com sucesso!",
                type: "valid",
                orderId
            }
        } catch (error) {
            loggers.error(`ShoppingController => createSale => erro ao criar uma nova venda ${error.message}`);
            throw new Error("não foi possivel criar venda!")
        }
    }
}
