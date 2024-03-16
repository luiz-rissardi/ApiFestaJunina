

export class OrderRepository {
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

    async insertMany(orders) {
        try {
            const connection = await this.#connect();
            await connection.query(`INSERT INTO orders  VALUES ?`, [orders]);
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateQuantityOne(productId, orderId, quantity) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE orders 
            SET quantity = quantity - ? 
            WHERE orderId = ? 
            AND productId = ?
            LIMIT 1;`, [quantity, orderId, productId])
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findMany(orderId, productId) {
        try {
            const connection = await this.#connect();
            const [[orders]] = await connection.query(`SELECT orderId, productId, SUM(quantity) AS quantity, SUM(totalPrice) AS totalPrice
            FROM orders
            WHERE orderId = ? AND productId = ?
            GROUP BY orderId, productId`, [orderId, productId]);
            connection.release();
            return orders;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findOneProductOfOrder(orderId, productId) {
        try {
            const connection = await this.#connect();
            const [product] = await connection.query(` SELECT *
            FROM orders
            WHERE productId = ? and 
            orderId = ?`, [productId, orderId]);
            connection.release();
            return product || false
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async insertOne(order) {
        try {
            const connection = await this.#connect();
            await connection.query(`INSERT INTO orders  VALUES (?,?,?,?)`
                ,[order.orderId, order.productId, order.totalPrice, order.quantity]
            );
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findTop(rank = 9999999) {
        try {
            const connection = await this.#connect();
            const [products] = await connection.query(`
            select  ST.productName , SUM(PS.totalPrice) as totalPrice
            from orders as PS
            inner join products as ST on ST.productId = PS.productId
            group by productName
            order by totalPrice desc
            limit ?`, [Number(rank)]);
            connection.release();
            return products
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateProductOne(orderId, productId, quantity, totalPrice) {
        try {
            const connection = await this.#connect();
            await connection.query(` 
            UPDATE orders
            SET quantity = quantity + ?,
                totalPrice = totalPrice + ?
            WHERE orderId = ? AND 
                  productId = ?
            `, [quantity, totalPrice, orderId, productId])
        } catch (error) {
            throw new Error(error.message)
        }
    }
}