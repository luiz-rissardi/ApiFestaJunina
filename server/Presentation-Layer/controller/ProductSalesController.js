
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
}