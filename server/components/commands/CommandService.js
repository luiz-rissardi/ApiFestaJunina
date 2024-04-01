import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { commandsEntity } from "../../util/entity/TypesOfSchema.js";
import { loggers } from "../../helpers/helper.js";
import { randomUUID } from "crypto"

export class CommandService extends ValidateFieldsTemplateMethod {

    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: commandsEntity })
        this.#repository = repository
    }

    async getNextAvaibleCommand() {
        try {
            const command = (await this.#repository.getAvaibleCommand())[0];
            if (command) {
                return {
                    command,
                    type: "valid"
                }
            }
            return {
                message: "comandas esgotadas! verifique se há alguma para reuso ou indique o cliente que use o numero do seu telefone cadastrado",
                type: "invalid"
            }
        } catch (error) {
            loggers.error(`CommandService => getNextAvaibleCommand => erro ao buscar command disponivel ${error.message}`)
            throw new Error("Não foi possível buscar a proxima comanda disponivel")
        }
    }

    async getCommandById(commandId) {
        try {
            commandId = Number(commandId);
            if (this.validate("commandId", commandId)) {
                const command = await this.#repository.findByCommandId(commandId);
                return command
            } else {
                loggers.info(this.mesageErrors)
            }
        } catch (error) {
            loggers.error(`CommandService => getCommandById => erro ao buscar command por id ${error.message}`)
            throw new Error("Não foi possível buscar commanda pelo ID")
        }
    }

    async getCommandByUrl(commandUrl) {
        try {
            if (this.validate("commandUrl", commandUrl)) {
                const command = await this.#repository.findByCommandUrl(commandUrl);
                if (command) {
                    return command
                } else {
                    return {
                        message: "comanda indisponivel",
                        type: "invalid"
                    }
                }
            } else {
                loggers.info(this.mesageErrors)
            }
        } catch (error) {
            loggers.error(`CommandService => getCommandByUrl => erro ao buscar command pela url ${error.message}`)
            throw new Error("Não foi possível buscar commanda pela url")
        }
    }

    async updateCommand(commandId, avaible) {
        try {
            commandId = Number(commandId);
            avaible = avaible == 0 ? false : true;
            if (this.validate("avaible", avaible) && this.validate("commandId", commandId)) {
                await this.#repository.putCommand(commandId, avaible);
                return {
                    message: "comanda atualizada com sucesso!",
                    type: "valid"
                }
            } else {
                return {
                    message: "não foi possivel atualizar a comanda",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`CommandService => updateCommand => erro ao atualizar comanda ${error.message}`)
            throw new Error("Não foi possível atualizar a comanda")
        }
    }

    async inactiveCommand(commandId) {
        try {
            if (this.validate("commandId", commandId)) {
                await this.#repository.inactiveCommand(commandId);
                return {
                    message: "comanda inativada com sucesso!",
                    type: "valid"
                }
            } else {
                return {
                    message: "numero de telefone não encontrado",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`CommandService => inactiveCommand => erro ao inativar comanda ${error.message}`)
            throw new Error("Não foi possível inativar a comanda")
        }
    }

    async generateCommandBatch(sizeOfBach = 3) {
        try {
            const commands = [];
            for (let index = 0; index < sizeOfBach; index++) {
                const url = randomUUID();
                const alreadyExists = (await this.#repository.findByCommandUrl(url)) != undefined
                if(alreadyExists == false){
                    commands.push(url)
                }else{
                    index--;
                }
            }
            const result = await this.#repository.createMany(commands)
            return result.map((el,index) => ({commandId:el,comamndUrl:commands[index]}))
        } catch (error) {
            loggers.error(`CommandService => generateCommandBatch => erro ao gerar o lote de comandas ${error.message}`)
            throw new Error("Não foi possível gerar o lote de comandas")
        }
    }
}