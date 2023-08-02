import { loggers } from "../../helpers/helper.js"
import { ValidateFieldsTemplateMethod } from "../util/TemplateMetods/ValidadetFileds.js";
import { UsersEntity } from "../util/entity/TypesOfSchema.js"
import { isSafeDataforSql } from "../util/isSafedataforSql.js";

export class UserService extends ValidateFieldsTemplateMethod {
    #repository;
    #AuthService;
    constructor({ repository, AuthService }) {
        super({ typeOfSchema: UsersEntity });
        this.#repository = repository;
        this.#AuthService = AuthService;
    }

    async login(userName, password) {
        try {
            if (this.validate("userName", userName)) {
                const passwordHash = this.#AuthService.encrypt(password);
                const [user] = await this.#repository.find(userName, passwordHash);
                if (user.length == 0) {
                    return "usuario ou senha invalidos"
                } else {
                    return user
                }
            } else {
                loggers.error(this.mesageErrors)
                return "dados invalidos"
            }
        } catch (error) {
            loggers.error(error.message)
            return "não foi possivel realizar o login"
        }
    }

    async changePassword(userId, newPassword) {
        try {
            const passwordHash = this.#AuthService.encryptPassword(newPassword);
            if (this.validate("userId", userId) & this.validate("passwordHash", passwordHash)) {
                await this.#repository.updateOne(userId, "passwordHash", passwordHash)
                return "senha atualizada com sucesso"
            } else {
                loggers.error(this.mesageErrors)
                return "dados inválidos"
            }
        } catch (error) {
            loggers.error(error)
            return "não foi possivel atualizar a senha"
        }
    }

    async changeUserName(userId, newUserName) {
        try {
            isSafeDataforSql(userId,newUserName)
            if (this.validate("userId", userId) & this.validate("userName", newUserName)) {
                await this.#repository.updateOne(userId, "userName", newUserName)
                return "nome atualizado com sucesso"
            } else {
                loggers.error(this.mesageErrors)
                return "dados inválidos"
            }
        } catch (error) {
            loggers.error(error)
            return "não foi possivel atualizar o nome"
        }
    }
}