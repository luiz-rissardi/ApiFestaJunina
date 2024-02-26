import { ValidateFieldsTemplateMethod } from "../Bussines-Layer/util/TemplateMethods/ValidadetFileds.js";
import { clientEntity } from "../Bussines-Layer/util/entity/TypesOfSchema.js";
import { loggers } from "../helpers/helper.js";

export class ClientService extends ValidateFieldsTemplateMethod {
    #repository
    constructor({ repository }) {
        super({ typeOfSchema: clientEntity })
        this.#repository = repository;
    }

    async registerClient(saleId, phone) {
        try {
            if (
                this.validate("saleId", saleId) &&
                this.validate("phone", phone)) {
                await this.#repository.insertOne(saleId,phone);
                return;
            } else {
                loggers.warn(`ClientService => registerClient => falhou ao registar cliente ${this.mesageErrors}`);
                return {
                    message: "dados inválidos",
                    type: "invalid",
                }
            }
        } catch (error) {
            loggers.error(`ClientService => registerClient => erro ao registrar cliente ${error.message}`);
            throw new Error("não foi possivel registar cliente")
        }
    }

    async getClient(phone) {
        try {
            if (this.validate("phone", phone)) {
                return await this.#repository.findOne(phone);
            } else {
                loggers.warn(`ClientService => getClient => falhou ao buscar cliente ${this.mesageErrors}`);
                return {
                    message: "dados inválidos",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`ClientService => registerClient => erro ao buscar cliente ${error.message}`);
            throw new Error("não foi possivel buscar cliente")
        }
    }
}