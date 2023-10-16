
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

    async getTotalPrice(request, response) {
        try {
            const { saleId } = request.params
            const totalPriceOfSale = await this.#service.findTotalPriceOfSale(Number(saleId))
            response.status(200).json(totalPriceOfSale)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end()
        }
    }
}