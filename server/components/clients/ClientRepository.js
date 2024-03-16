

export class ClientRepository {
    #connection
    constructor({ connection }) {
        this.#connection = connection;
    }

    async #connect() {
        try {
            return await this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error("não foi possivel realizar conexão")
        }
    }

    async insertOne(orderId, phone) {
        try {
            const connection = await this.#connect();
            const [result] = await connection.query("INSERT INTO clients (orderId,phone) VALUES (?,?)", [orderId, phone]);
            connection.release();
            return result.insertId;
        } catch (error) {
            console.log(error);
            throw new Error(`Erro ao registrar cliente ${error.message}`)
        }
    }

    async findOne(phone) {
        try {
            const connection = await this.#connect();
            const [[client]] = await connection.query("SELECT * FROM clients WHERE phone = ?", [phone]);
            connection.release();
            return client;
        } catch (error) {
            throw new Error(`Erro ao buscar cliente: ${error.message}`);
        }
    }

    async findByCommand(command) {
        try {
            const connection = await this.#connect();
            const [[client]] = await connection.query("SELECT * FROM clients WHERE command = ?", [command]);
            connection.release();
            return client;
        } catch (error) {
            throw new Error(`Erro ao buscar cliente: ${error.message}`);
        }
    }
}