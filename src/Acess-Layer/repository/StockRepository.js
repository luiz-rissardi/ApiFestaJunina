
export class StockRepository {

    constructor({ connection }) {
        this.connection = connection
    }

    async findAll() {
        try {
            const [productsInStock] = await this.connection.promise().query("SELECT * FROM stock");
            return productsInStock;
        } catch (error) {
            throw new Error(`um erro ocorreu quando pegava os produtos ${error.message}`)
        }
    }

    async updateOne(productId, field, newValue) {
        try {
            await this.connection.promise().query(`UPDATE stock SET ${field} = '${newValue}' WHERE productId = ${productId}`)
            return;
        } catch (error) {
            throw new Error(`um erro ocorreu quando atualizava os produtos ${error.message}`)
        }
    }

}


