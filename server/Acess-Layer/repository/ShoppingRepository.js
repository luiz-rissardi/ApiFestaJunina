
export class ShoppingRepository {
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
            const [result] = await connection.query("SELECT * FROM shopping WHERE dateOfSale between ? and ? ",[initialDate,endDate])
            connection.release();
            return result;
        } catch (error) {
            throw new Error(`Erro ao buscar dados de Shopping ${error.message}`)
        }
    }

    async insertOne(dateOfSale, saleId) {
        try {
            const connection = await this.#connect();
                const [existingRecord] = await connection.query('SELECT saleId FROM shopping WHERE saleId = ?', [saleId]);
    
            if (existingRecord.length === 0) {
                await connection.query('INSERT INTO shopping (saleId, dateOfSale) VALUES (?, ?)', [saleId, dateOfSale]);
                connection.release();
            }
            return saleId;
        } catch (error) {
            throw new Error(`Erro ao inserir uma nova venda: ${error.message}`);
        }
    }

    async count() {
        try {
            const connection = await this.#connect()
            const [result] = await connection.query("SELECT saleId FROM shopping")
            connection.release()
            return result.length
        } catch (error) {
            throw new Error(`Erro ao contar as vendas ${error.message}`)
        }
    }
}
