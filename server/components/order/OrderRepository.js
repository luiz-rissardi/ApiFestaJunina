
export class OrderRepository {
    #connection;
    constructor({ connection }) {
        this.#connection = connection;
    }

    #connect() {
        try {
            return this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error("não foi possivel realizar conexão")
        }
    }

    async findBetweenDate(initialDate, endDate) {
        try {
            const connection = await this.#connect();
            const [result] = await connection.query("SELECT * FROM orders WHERE dateOfCreate between ? and ? ",[initialDate,endDate])
            connection.release();
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async insertOne(dateOfCreate, orderId) {
        try {
            const connection = await this.#connect();
                const [existingRecord] = await connection.query('SELECT orderId FROM orders WHERE orderId = ?', [orderId]);
    
            if (existingRecord.length === 0) {
                await connection.query('INSERT INTO orders (orderId, dateOfCreate) VALUES (?, ?)', [orderId, dateOfCreate]);
                connection.release();
            }
            return orderId;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async count() {
        try {
            const connection = await this.#connect()
            const [result] = await connection.query("SELECT orderId FROM orders")
            connection.release()
            return result.length
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
