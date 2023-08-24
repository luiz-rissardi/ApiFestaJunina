import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../util/TemplateMethods/ValidadetFileds.js";
import { shoppingEntity } from "../util/entity/TypesOfSchema.js";

export class ShoppingService extends ValidateFieldsTemplateMethod {
    #repository
    constructor({ repository }) {
        super({ typeOfSchema: shoppingEntity })
        this.#repository = repository;
    }

    findSalesAfterDate(date) {
        try {
            if (this.validate("dateOfSale", date, { ValidationDateOn: true })) {
                const data = this.#repository.findAfterDate(date);
                return data;
            } else {
                loggers.warn(`ShoppingController => findSalesAfterDate => ${this.mesageErrors}`)
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error("ShoppingService => findSalesAfterDate => ",error);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async findSalesBeforeDate(date){
        try {
            if(this.validate("dateOfSale",date)){
                const data = await this.#repository.findBeforeDate(date);
                return data;
            }else{
                loggers.warn(`ShoppingController => findSalesBeforeDate => ${this.mesageErrors}`)
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error("ShoppingController => findSalesBeforeDate => ",error);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async findBetweenDate(initialDate,endedDate){
        try {
            if(this.validate("dateOfSale",initialDate) && this.validate("dateOfSale",endedDate)){
                const data = await this.#repository.findBetweenDate(initialDate,endedDate);
                return data;
            }else{
                loggers.warn(`ShoppingController => findBetweenDate => ${this.mesageErrors}`);
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error("ShoppingController => findBetweenDate => ",error);
            throw new Error("não foi possivlem buscar os dados!")
        }
    }

    async countTotalSales(){
        try {
            const count = await this.#repository.count();
            return count
        } catch (error) {
            loggers.error("ShoppingController => countTotalSales => ",error);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async createSale(dateOfSale){
        try {
            if(this.validate("dateOfSale",dateOfSale)){
                this.#repository.insertOne(dateOfSale);
                return "venda criada com sucesso!"
            }else{
                loggers.warn(`ShoppingController => createSale => ${this.mesageErrors}`);
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error("ShoppingController => createSale => ",error);
            throw new Error("não foi possivel criar venda!")
        }
    }
}
