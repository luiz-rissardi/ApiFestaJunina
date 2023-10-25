

export class ProductSalesRepository {
    #connection;
    constructor({ connection }) {
        this.#connection = connection;
    }

    async #connect() {
        try {
            return await this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error("não foi possivel conectar-se com o banco de dados!")
        }
    }

    async insertMany(productsSales) {
        try {
            const connection = await this.#connect();
            await connection.query(`INSERT INTO productSales  VALUES ?`, [productsSales]);
            connection.release();
            return;
        } catch (error) {
            throw new Error(`Erro ao inserir os produtos da venda ${error.message}`)
        }
    }
}