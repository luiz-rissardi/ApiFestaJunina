
export class ProductSalesController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async insertProducts(request, response) {
        try {
            const { products, saleId } = request.body;
            const result = await this.#service.insertProdutsIntoSale(products, saleId)
            response.status(201).json(result)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async recordProductSales(request, response) {
        try {
            const { saleId, productId, quantity } = request.body;
            const result = await this.#service.recordProductsSales(saleId, quantity, productId);
            response.status(200).json(result)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async getProductSales(request, response) {
        try {
            const { saleId, productId } = request.params;
            const productSales = await this.#service.findProductsOfSale(saleId, productId);
            response.status(200).json(productSales);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getTopProductsOfSales(request, response) {
        try {
            const { rank } = request.params;
            const result = await this.#service.findTopProductsOfSales(rank);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}