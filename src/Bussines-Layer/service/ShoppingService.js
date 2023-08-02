import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../util/TemplateMetods/ValidadetFileds.js";
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
                return this.#repository.findAfterDate(date);
            } else {
                loggers.warn(this.mesageErrors);
                return "data invalida!"
            }
        } catch (error) {
            loggers.error(error.message)
            return "não foi possivel buscar os dados!"
        }
    }

    async findSalesBeforeDate(date){
        try {
            if(this.validate("dateOfSale",date)){
                return await this.#repository.findBeforeDate(date)
            }else{
                loggers.warn(this.mesageErrors)
                return "data inválida!"
            }
        } catch (error) {
            loggers.error(error);
            return "não foi possivel buscar os dados!"
        }
    }

    async findBetweenDate(initialDate,endedDate){
        try {

            if(this.validate("dateOfSale",initialDate) && this.validate("dateOfSale",endedDate)){
                return await this.#repository.findBetweenDate(initialDate,endedDate);
            }else{
                loggers.warn(this.mesageErrors);
                return "datas invalidas!"
            }
        } catch (error) {
            loggers.error(error);
            return "não foi possivlem buscar os dados!"
        }
    }

    async countTotalSales(){
        try {
            return await this.#repository.count()
        } catch (error) {
            return "não foi possivel buscar os dados!"
        }
    }

    async createSale(dateOfSale){
        try {
            isSafeDataforSql(dateOfSale);
            if(this.validate("dateOfSale",dateOfSale)){
                this.#repository.insertOne(dateOfSale);
                return "venda criada com sucesso!"
            }else{
                loggers.warn(this.mesageErrors);
                return "data inválida!"
            }
        } catch (error) {
            return "não foi possivel criar venda!"
        }
    }
}
