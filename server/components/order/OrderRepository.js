
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
            const [result] = await connection.query("SELECT * FROM orders WHERE dateOfCreate between ? and ? ", [initialDate, endDate])
            connection.release();
            return result;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getOne(orderId) {
        try {
            const connection = await this.#connect();
            const [order] = await connection.query('SELECT orderId FROM orders WHERE orderId = ?', [orderId]);
            connection.release();
            return order
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async insertOne(dateOfCreate, orderId,commandId) {
        try {
            const connection = await this.#connect();
            await connection.query('INSERT INTO orders (orderId, dateOfCreate,commandId,avaible) VALUES (?,?,?,true)', [orderId, dateOfCreate,commandId]);
            connection.release();
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

    async inativeOrder(commandId){
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE orders set avaible = false WHERE commandId = ? and avaible = true 
            `,[commandId])
            connection.release();
            return ;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
