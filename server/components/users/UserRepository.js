
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
            const [[user]] = await connection.query("select * from users where users.userName = ? && users.passwordHash = ? ", [userName, passwordHash])
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
            return ;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createUserAdmin() {
        try {
            const connection = await this.#connect();
            await connection.query(
                "INSERT INTO users (userName,passwordHash,typeAccount) VALUES (?,?,?)",
                ["ifpr", "9936f007a706190a4ef6316a221b1db853388e4d4d2389c1c006682a59eff7e303e987267535361c3806baf742d67693f320b22701720f1484b3ce43a76c59c8", 1]);
            connection.release();
            return ;
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