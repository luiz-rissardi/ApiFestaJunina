

export class ProductRepository {

    #connection
    constructor({ connection }) {
        this.#connection = connection
    }

    async #connect() {
        try {
            return await this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findAll() {
        try {
            const connection = await this.#connect();
            const [productsInproduct] = await connection.query("SELECT * FROM products where active = true");
            connection.release()
            return productsInproduct;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateOne(productId, product) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE products SET productName = ? ,price = ?, quantity = ?, active = ?, productChosen = ? WHERE productId = ?`,
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
            throw new Error(error.message)
        }
    }

    async substractionProduct(updates) {
        try {
            const connection = await this.#connect();
            await connection.beginTransaction();
            for await (let update of updates) {
                connection.query("UPDATE products SET quantity = quantity - ? WHERE productId = ?", [Number(update.quantity), update.productId])
            }
            await connection.commit();
            connection.release();
        } catch (error) {
            console.log(error);
            //throw new Error(error.message)
        }
    }

    async insertOne(product) {
        try {
            const { productName, price, quantity } = product;
            const connection = await this.#connect();
            const [result] = await connection.query("INSERT INTO products (productName,price,quantity,active,productChosen) VALUES (?, ?, ?, true,false)", [productName, price, quantity, true])
            connection.release();
            return result.insertId;
        } catch (error) {
            throw new Error(error.message)
        }
    }

}


