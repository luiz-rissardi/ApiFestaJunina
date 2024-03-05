
export class UserRepository {
    #connection;
    constructor({ connection }) {
        this.#connection = connection;
    }

    async #connect() {
        try {
            return await this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findOne(userName, passwordHash) {
        try {
            const connection = await this.#connect();
            const [user] = await connection.query("select * from users where users.userName = ? && users.passwordHash = ? ", [userName, passwordHash])
            connection.release();
            return user;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateOne(userName, field, newValue) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE users SET ${field} = '${newValue}' WHERE userName = '${userName}' `)
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createUser(account) {
        try {
            const connection = await this.#connect();
            await connection.query(
                "INSERT INTO users (userName,passwordHash,productIdAnexed,typeAccount) VALUES (?,?,?,?)",
                [account.userName, account.passwordHash, account.productIdAnexed, account.typeAccount]);
            connection.release();
            return false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async alreadyExists(userName) {
        const connection = await this.#connect();
        const [alreadyExists] = await connection.query("SELECT * FROM users WHERE userName = ?", [userName]);
        connection.release();
        return alreadyExists.length != 0;
    }
}