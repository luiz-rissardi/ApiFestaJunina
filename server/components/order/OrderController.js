
export class OrderController {
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
            const result = await this.#service.recordOrders(orderId, quantity, productId);
            response.status(200).json(result)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async getOrders(request, response) {
        try {
            const { orderId, productId } = request.params;
            const productSales = await this.#service.findOrder(orderId, productId);
            response.status(200).json(productSales);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getTopOrders(request, response) {
        try {
            const { rank } = request.params;
            const result = await this.#service.findTopOrders(rank);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}