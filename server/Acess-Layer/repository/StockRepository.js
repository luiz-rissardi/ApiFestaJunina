

export class StockRepository {

    #connection
    constructor({ connection }) {
        this.#connection = connection
    }

    async #connect() {
        try {
            return await this.#connection.promise().getConnection();
        } catch (error) {
            console.log(error);
            throw new Error("não foi possivel conectar-se com o banco de dados!")
        }
    }

    async findAll() {
        try {
            const connection = await this.#connect();
            const [productsInStock] = await connection.query("SELECT * FROM stock where active = true");
            connection.release()
            return productsInStock;
        } catch (error) {
            throw new Error(`um erro ocorreu quando pegava os produtos ${error.message}`)
        }
    }

    async updateOne(productId, product) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE stock SET productName = ? ,price = ?, quantity = ?, active = ?, productChosen = ? WHERE productId = ?`,
                [
                    product?.productName,
                    product?.price,
                    product?.quantity,
                    product?.active,
                    product?.productChosen,
                    productId
                ]
            )
            connection.release();
            return;
        } catch (error) {
            console.log(error);
            throw new Error(`um erro ocorreu quando atualizava os produtos ${error.message}`)
        }
    }

    async substractionStock(updates) {
        try {
            const connection = await this.#connect();
            await connection.beginTransaction();
            for await (let update of updates) {
                connection.query("UPDATE stock SET quantity = quantity - ? WHERE productId = ?", [Number(update.quantity), update.productId])
            }
            await connection.commit();
            connection.release();
        } catch (error) {
            console.log(error);
            throw new Error("não foi possivel fazer as subtração no estoque ")
        }
    }

    async insertOne(product) {
        try {
            const { productName, price, quantity } = product;
            const connection = await this.#connect();
            const [result] = await connection.query("INSERT INTO stock (productName,price,quantity,active) VALUES (?, ?, ?, true)", [productName, price, quantity])
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new Error(`um erro ocorreu ao tentar inserir novos produtos ${error.message}`)
        }
    }

}


