
export class OrderProdutsController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async insertProductsIntoOrder(request, response) {
        try {
            const { products, orderId } = request.body;
            const result = await this.#service.insertProdutsIntoOrder(products, orderId)
            response.status(201).json(result)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async recordOrders(request, response) {
        try {
            const { orderId, productId, quantity } = request.body;
            const result = await this.#service.recordOrderProduts(orderId, quantity, productId);
            response.status(200).json(result)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async getAllProductOfOrder(request, response) {
        try {
            const { orderId } = request.params;
            const result = await this.#service.findAllProdutsOfOrder(orderId);
            response.status(200).json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async refoundOrderProduts(request, response) {
        try {
            const { descontQuantity, descontPrice, orderId, productId } = request.body;
            const result = await this.#service.refoundOrderProducts(descontQuantity, descontPrice, orderId, productId);
            response.status(200).json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getProductOfOrder(request, response) {
        try {
            const { orderId, productId } = request.params;
            const result = await this.#service.findOrderProduts(orderId, productId);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getTopOrdersProduct(request, response) {
        try {
            const { rank } = request.params;
            const result = await this.#service.findTopOrderProduts(rank);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}