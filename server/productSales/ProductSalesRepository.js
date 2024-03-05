

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
            throw new Error(error.message)
        }
    }

    async updateQuantityOne(productId, saleId, quantity) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE productSales 
            SET quantity = quantity - ? 
            WHERE saleId = ? 
            AND productId = ?
            LIMIT 1;`, [quantity, saleId, productId])
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findMany(saleId, productId) {
        try {
            const connection = await this.#connect();
            const [[productSales]] = await connection.query(`SELECT saleId, productId, SUM(quantity) AS quantity, SUM(totalPrice) AS totalPrice
            FROM productSales
            WHERE saleId = ? AND productId = ?
            GROUP BY saleId, productId`, [saleId, productId]);
            connection.release();
            return productSales;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findOne(saleId, productId) {
        try {
            const connection = await this.#connect();
            const [product] = await connection.query(` SELECT *
            FROM productSales
            WHERE productId = ? and 
            saleId = ?`, [productId, saleId]);
            connection.release();
            return product || false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async insertOne(productSale) {
        try {
            const connection = await this.#connect();
            await connection.query(`INSERT INTO productSales  VALUES (?,?,?,?)`
                , [productSale.saleId, productSale.productId, productSale.totalPrice, productSale.quantity]
            );
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProductOne(saleId, productId, quantity, totalPrice) {
        try {
            const connection = await this.#connect();
            await connection.query(` 
            UPDATE productSales
            SET quantity = quantity + ?,
                totalPrice = totalPrice + ?
            WHERE saleId = ? AND 
                  productId = ?
            `, [quantity, totalPrice, saleId, productId])
        } catch (error) {
            throw new Error(error.message)
        }
    }
}