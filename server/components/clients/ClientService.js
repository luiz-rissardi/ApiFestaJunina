import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { clientEntity } from "../../util/entity/TypesOfSchema.js";
import { loggers } from "../../helpers/helper.js";

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
                const commandId = await this.#repository.insertOne(saleId,phone);
                return commandId;
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

    async getClientByCommand(command){
        try {
            const client = await this.#repository.findByCommand(command);
            return client
        } catch (error) {
            loggers.error(`ClientService => findbyCommand => erro ao buscar cliente ${error.message}`);
            throw new Error("não foi possivel buscar cliente")
        }
    }
}