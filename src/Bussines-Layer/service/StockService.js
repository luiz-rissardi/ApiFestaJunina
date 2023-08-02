
import { loggers } from "../../helpers/helper.js";
import { ValidateFieldsTemplateMethod } from "../util/TemplateMetods/ValidadetFileds.js";
import { StockEntity } from "../util/entity/TypesOfSchema.js"

export class StokService extends ValidateFieldsTemplateMethod {
    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: StockEntity });
        this.#repository = repository;
    }

    async findAllPorductsInStock() {
        try {
            const produts = await this.#repository.findAll();
            return produts
        } catch (error) {
            loggers.error(error.message)
            return "não foi possivel buscar os dados";
        }
    }

    async updateProduct(productId, field, newValue) {
        try {
            if (this.validate(field, newValue)) {
                await this.#repository.updateOne(productId, field, newValue);
                return "produto atualizado com sucesso"
            } else {
                loggers.error(this.mesageErrors)
                return "valor invalido"
            }
        } catch (error) {
            loggers.error(error.message)
            return "não foi possivel atualizar o usuario"
        }
    }

}
