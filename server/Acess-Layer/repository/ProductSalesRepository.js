

export class ProductSalesRepository {
    #connection;
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

    async updateOne(productId,saleId,quantity){
        try {
            const connection = await this.#connect();
            await connection.query(`update productSales set quantity = quantity - ? where saleId = ? and productId = ?`,[quantity,saleId,productId])
            connection.release();
            return;
        } catch (error) {
            throw new Error(`Erro ao dar baixa em produto ${error.message}`)
        }
    }

    async findMany(saleId,productId){
        try {
            const connection = await this.#connect();
            const [ [productSales] ] = await connection.query(`SELECT saleId, productId, SUM(quantity) AS quantity, SUM(totalPrice) AS totalPrice
            FROM productSales
            WHERE saleId = ? AND productId = ?
            GROUP BY saleId, productId`,[saleId,productId]);
            connection.release();
            return productSales;
        } catch (error) {
            throw new Error(`Error ao buscar produtos da venda ${error.message}`)
        }
    }
}