
export class ShoppingController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async getBetweenDate(request, response) {
        try {
            const { dateInitial, dateEnded } = request.params;
            const sales = await this.#service.findBetweenDate(dateInitial, dateEnded);
            response.status(200).json(sales)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async getCountTotalSales(request, response) {
        try {
            const totalCount = await this.#service.countTotalSales();
            response.status(200).write(String(totalCount));
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async createSale(request,response){
        try {
            const result = await this.#service.createSale();
            response.status(201).json(result)
        } catch (error) {
            response.writeHead(500)
        }finally{
            response.end();
        }
    }
}








