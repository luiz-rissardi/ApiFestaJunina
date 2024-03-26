import { loggers } from "../../helpers/helper.js"
import { ValidateFieldsTemplateMethod } from "../../util/TemplateMethods/ValidadetFileds.js";
import { UsersEntity } from "../../util/entity/TypesOfSchema.js"
import { AuthService } from "./Auth/Auth.js";

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
                const result = await this.#repository.findOne(userName, passwordHash);
                const userIsAuthenticated = result != undefined;
                const user =  userIsAuthenticated != undefined ? result : null;
                return {
                    authenticated: userIsAuthenticated,
                    user
                }
            } else {
                loggers.error(`User => login => falhou ao validar os dados ${this.mesageErrors}`)
                return "dados invalidos"
            }
        } catch (error) {
            loggers.error(`User => login => erro ao buscar usuario ${error.message}`)
            throw new Error("não foi possivel realizar o login");
        }
    }

    async createAccount(userName, password, productIdAnexed) {
        try {
            const accountIsValid = this.#validateUser({ userName, password, productIdAnexed });
            if (accountIsValid) {
                const passwordHash = AuthService.encryptPassword(password);
                const account = {
                    userName,
                    passwordHash,
                    productIdAnexed,
                    typeAccount: 2
                }
                const alredyExist = await this.#repository.alreadyExists(account.userName);
                if (alredyExist) {
                    return {
                        authenticated: false,
                        user: null,
                        message: "nome de usuario já em uso"
                    }
                }
                await this.#repository.createUser(account);
                return {
                    authenticated: true,
                    user: account
                }
            } else {
                loggers.error(`User => login => falhou ao validar os dados ${this.mesageErrors}`);
                return {
                    authenticated: false,
                    user: null
                }
            }
        } catch (error) {
            loggers.error(`User => createAccount => erro ao criar novo usuario ${error.message}`);
            throw new Error("não foi possivel criar conta");
        }
    }

    async changePassword(userName, password) {
        try {
            const passwordHash = AuthService.encryptPassword(password);
            const alredyExist = await this.#repository.alreadyExists(userName);
            if (alredyExist) {
                if (this.validate("userName", userName) && this.validate("passwordHash", passwordHash)) {
                    await this.#repository.updateOne(userName, 'passwordHash', passwordHash)
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
            } else {
                return {
                    message: "usuario não existe",
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

    #validateUser(user) {
        return !Object.keys(user).map(key => {
            return this.validate(key, user[key])
        }).includes(false);

    }
}

