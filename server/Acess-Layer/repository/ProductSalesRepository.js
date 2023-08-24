

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

    async findTotalPriceOfSale(saleId) {
        try {
            const connection = await this.#connect();
            const [result] = await connection.query(`
            select ST.productName, sum( PS.Totalprice ) as totalPrice
            from productSales as PS
            inner join stock as ST on PS.productId = ST.productId
            where PS.saleId = ${saleId}
            group by ST.productName`)
            connection.release();
            return result
        } catch (error) {
            return `Erro ao buscar dados da venda ${error.message}`
        }
    }
}