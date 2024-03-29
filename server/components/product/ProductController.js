
export class ProductController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async getAllProducts(request, response) {
        try {
            const data = await this.#service.findAllProductsInProduct();
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
            const result = await this.#service.createProduct(product);
            response.json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async addQuantityProduct(request, response) {
        try {
            const { productId, quantity } = request.body;
            const result = await this.#service.addProduct(productId,quantity);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async substractionProduct(request, response) {
        try {
            const { updates } = request.body;
            this.#service.substractionOfProduct(updates);
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