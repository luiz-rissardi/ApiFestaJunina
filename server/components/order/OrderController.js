
export class OrderController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async getBetweenDate(request, response) {
        try {
            const { dateInitial, dateEnded } = request.params;
            const orders = await this.#service.findBetweenDate(dateInitial, dateEnded);
            response.status(200).json(orders)
        } catch (error) {
            response.writeHead(500)
        } finally {
            response.end();
        }
    }

    async getCountTotalOrders(request, response) {
        try {
            const countOrders = await this.#service.countTotalOrders();
            response.status(200).write(String(countOrders));
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async createOrder(request,response){
        try {
            const { orderId, commandId } = request.body;
            const result = await this.#service.createOrder(orderId,commandId);
            response.status(201).json(result)
        } catch (error) {
            response.writeHead(500)
        }finally{
            response.end();
        }
    }

    async inativeOrder(request,response){
        try {
            const { commandId } = request.body;
            await this.#service.inativeOrder(commandId)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async putCommandInOrder(request,response){
        try {
            const { orderId, commandId } = request.body;
            const result = await this.#service.putCommandIdIntoOrder(orderId,commandId);
            response.json(result)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async getOrderByCommandId(request,response){
        try {
            const { commandId } = request.params;
            const result = await this.#service.findCommandByCommandId(commandId);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }
}








