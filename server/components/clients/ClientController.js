

export class ClientController {

    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async handlerClient(request, response) {
        try {
            const { orderId, phone } = request.body;
            const client = await this.#service.getClient(phone)
            if (client?.orderId == undefined || client?.orderId == null) {
                await this.#service.registerClient(orderId, phone);
                response.status(200).json({orderId, alreadyExists:false})
            }else{
                response.status(200).json({orderId:client?.orderId, alreadyExists:true})
            }
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getClient(request, response) {
        try {
            const { phone } = request.params;
            const client = await this.#service.getClient(phone)
            response.json(client);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}