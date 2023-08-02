
export class UserRepository {
    #connection;
    constructor({ connection }) {
        this.#connection = connection;
    }

    async find(userName, passwordHash) {
        try {
            const user = await this.#connection.promise().query(`select * from users where users.userName = '${userName}' && users.passwordHash = '${passwordHash}' `)
            return user;
        } catch (error) {
            throw new Error(`Erro ao realizar o login ${error.message}`)
        }
    }

    async updateOne(productId, field, newValue) {
        try {
            await this.#connection.promise().query(`UPDATE users SET ${field} = '${newValue}' WHERE userId = ${productId} `)
            return;
        } catch (error) {
            throw new Error(`Erro ao realizar mundaça de dados ${error.message}`)
        }
    }
}