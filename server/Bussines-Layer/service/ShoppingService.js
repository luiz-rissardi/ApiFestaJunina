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
                loggers.warn(`ShoppingController => findSalesAfterDate => falhou ao validar  data ${this.mesageErrors}`)
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error(`ShoppingService => findSalesAfterDate => erro ao pegar vendas apos uma data ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async findSalesBeforeDate(date){
        try {
            if(this.validate("dateOfSale",date)){
                const data = await this.#repository.findBeforeDate(date);
                return data;
            }else{
                loggers.warn(`ShoppingController => findSalesBeforeDate => falhou ao validar a data ${this.mesageErrors}`)
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error(`ShoppingController => findSalesBeforeDate => erro ao pegar vendas antes de uma data ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async findBetweenDate(initialDate,endedDate){
        try {
            if(this.validate("dateOfSale",initialDate) && this.validate("dateOfSale",endedDate)){
                const data = await this.#repository.findBetweenDate(initialDate,endedDate);
                return data;
            }else{
                loggers.warn(`ShoppingController => findBetweenDate => falho ao validar as datas ${this.mesageErrors}`);
                throw new Error("data invalida!");
            }
        } catch (error) {
            loggers.error(`ShoppingController => findBetweenDate => erro ao pegar vendas entre duas datas ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async countTotalSales(){
        try {
            const count = await this.#repository.count();
            return count
        } catch (error) {
            loggers.error(`ShoppingController => countTotalSales => erro ao pegar o total de vendas ${error.message}`);
            throw new Error("não foi possivel buscar os dados!")
        }
    }

    async createSale(dateOfSale){
        try {
            if(this.validate("dateOfSale",dateOfSale)){
                this.#repository.insertOne(dateOfSale);
                return {
                    message:"venda criada com sucesso!",
                    type:"valid"
                }
            }else{
                loggers.warn(`ShoppingController => createSale => falhou ao validar a data ${this.mesageErrors}`);
                return {
                    message:"não foi possivel criar uma venda",
                    type:"invalid"
                }
            }
        } catch (error) {
            loggers.error(`ShoppingController => createSale => erro ao criar uma nova venda ${error.message}`);
            throw new Error("não foi possivel criar venda!")
        }
    }
}
