
export class StockController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async getAllProductsInStock(request, response) {
        try {
            const data = await this.#service.findAllProductsInStock();
            response.json(data)
        } catch (error) {
            console.log(error);
            response.writeHead(500)
        } finally {
            response.end()
        }
    }

    async createProduct(request, response) {
        try {
            const product = request.body;
            console.log(product);
            const result = await this.#service.createProduct(product);
            response.json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async substractionStock(request, response) {
        try {
            const { updates } = request.body;
            this.#service.substractionOfStock(updates);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async updateProduct(request, response) {
        try {
            const { productId, product } = request.body;
            const result = await this.#service.updateProduct(productId, product)
            response.json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}