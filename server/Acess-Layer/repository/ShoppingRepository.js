
export class ShoppingRepository {
    #connection;
    constructor({ connection }) {
        this.#connection = connection;
    }

    #connect() {
        try {
            return this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error("não foi possivel conectar-se com o banco de dados!")
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

    async insertOne(dateOfSale) {
        try {
            const connection = await this.#connect();
            const [result] = await connection.query('INSERT INTO shopping (dateOfSale) VALUES (?)', [dateOfSale]);
            connection.release()
            return result.insertId;
        } catch (error) {
            throw new Error(`Erro ao inserir um nova venda ${error.message}`)
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
