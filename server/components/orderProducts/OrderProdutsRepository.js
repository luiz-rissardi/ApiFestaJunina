

export class OrderProdutsRepository {
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
            await connection.query(`INSERT INTO order_products  VALUES ?`, [orders]);
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async updateQuantityOne(productId, orderId, quantity) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE order_products 
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
            const [[orders]] = await connection.query(`SELECT OP.orderId, OP.productId, P.productName, SUM(OP.quantity) AS quantity, SUM(OP.totalPrice) AS totalPrice
            FROM order_products as OP
            INNER JOIN products as P on P.productId = OP.productId
            WHERE OP.orderId = ? AND OP.productId = ?
            GROUP BY OP.orderId, P.productId`, [orderId, productId]);
            connection.release();
            return orders;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findAll(orderId) {
        try {
            const connection = await this.#connect();
            const [products] = await connection.query(`
            SELECT OP.orderId, P.productId,P.productName, OP.totalPrice, OP.quantity, P.price as OriginalPrice 
            from order_products as OP
            inner join products as P on P.productId = OP.productId
            WHERE orderId = ?`,
                [orderId]);
            connection.release();
            return products;
        } catch (error) {
            throw new Error(error.message)
        }
    }


    async findOneProductOfOrder(orderId, productId) {
        try {
            const connection = await this.#connect();
            const [product] = await connection.query(` SELECT *
            FROM order_products
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
            await connection.query(`INSERT INTO order_products  VALUES (?,?,?,?)`
                , [order.orderId, order.productId, order.totalPrice, order.quantity]
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
            from order_products as PS
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
            UPDATE order_products
            SET quantity = quantity + ?,
                totalPrice = totalPrice + ?
            WHERE orderId = ? AND 
                  productId = ?
            `, [quantity, totalPrice, orderId, productId])
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }
}