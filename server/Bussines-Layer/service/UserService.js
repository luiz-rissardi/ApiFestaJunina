import { loggers } from "../../helpers/helper.js"
import { ValidateFieldsTemplateMethod } from "../util/TemplateMethods/ValidadetFileds.js";
import { UsersEntity } from "../util/entity/TypesOfSchema.js"
import { AuthService } from "../Auth/Auth.js";

export class UserService extends ValidateFieldsTemplateMethod {
    #repository;
    constructor({ repository }) {
        super({ typeOfSchema: UsersEntity });
        this.#repository = repository;
    }

    async login(userName, password) {
        try {
            if (this.validate("userName", userName)) {
                const passwordHash = AuthService.encryptPassword(password);
                const user = await this.#repository.findOne(userName, passwordHash);
                const userIsAuthenticated = user.length != 0
                if (userIsAuthenticated) {
                    return {
                        authenticated: true,
                        user
                    }
                } else {
                    return {
                        authenticated: false,
                        user: null
                    }
                }
            } else {
                loggers.error(`User => login => falhou ao validar os dados ${this.mesageErrors}`)
                return "dados invalidos"
            }
        } catch (error) {
            loggers.error(`User => login => erro ao buscar usuario ${error.message}`)
            return "não foi possivel realizar o login"
        }
    }

    async changePassword(userId, newPassword) {
        try {
            const passwordHash = AuthService.encryptPassword(newPassword);
            if (this.validate("userId", userId) & this.validate("passwordHash", passwordHash)) {
                await this.#repository.updateOne(userId, "passwordHash", passwordHash)
                return {
                    message: "senha atualizada com sucesso",
                    type: "valid"
                }
            } else {
                loggers.error(`User => changePassword => falhou aon validar os dados ${this.mesageErrors}`)
                return {
                    message: "dados inválidos",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`User => changePassword => erro ao atualizar senha ${error.message}`)
            return "não foi possivel atualizar a senha"
        }
    }

    async changeUserName(userId, newUserName) {
        try {
            if (this.validate("userId", userId) & this.validate("userName", newUserName)) {
                await this.#repository.updateOne(userId, "userName", newUserName)
                return {
                    message: "nome atualizado com sucesso",
                    type: "valid"
                }
            } else {
                loggers.error(`User => changeUserName => falhou ao validar os dados ${this.mesageErrors}`)
                return {
                    message: "dados inválidos",
                    type: "invalid"
                }
            }
        } catch (error) {
            loggers.error(`User => changeUserName => erro ao atualizar o nome do usuario ${error.message}`)
            return "não foi possivel atualizar o nome"
        }
    }
}

