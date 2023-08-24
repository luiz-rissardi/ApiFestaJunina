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
                if (user.length == 0) {
                    return {
                        authenticated:false,
                        user:null
                    }
                } else {
                    return {
                        authenticated:true,
                        user
                    }
                }
            } else {
                loggers.error(`User => login => ${this.mesageErrors}`)
                return "dados invalidos"
            }
        } catch (error) {
            loggers.error("User => login => ",error)
            return "não foi possivel realizar o login"
        }
    }

    async changePassword(userId, newPassword) {
        try {
            const passwordHash = AuthService.encryptPassword(newPassword);
            if (this.validate("userId", userId) & this.validate("passwordHash", passwordHash)) {
                await this.#repository.updateOne(userId, "passwordHash", passwordHash)
                return "senha atualizada com sucesso"
            } else {
                loggers.error(`User => changePassword => ${this.mesageErrors}`)
                return "dados inválidos"
            }
        } catch (error) {
            loggers.error("User => changePassword => ",error)
            return "não foi possivel atualizar a senha"
        }
    }

    async changeUserName(userId, newUserName) {
        try {
            if (this.validate("userId", userId) & this.validate("userName", newUserName)) {
                await this.#repository.updateOne(userId, "userName", newUserName)
                return "nome atualizado com sucesso"
            } else {
                loggers.error(`User => changeUserName => ${this.mesageErrors}`)
                return "dados inválidos"
            }
        } catch (error) {
            loggers.error("User => changeUserName",error)
            return "não foi possivel atualizar o nome"
        }
    }
}

