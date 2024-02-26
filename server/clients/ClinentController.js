

export class ClientController {

    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async handlerClient(request, response) {
        try {
            const { saleId, phone } = request.body;
            const client = await this.#service.getClient(phone)
            if (client?.saleId == undefined || client?.saleId == null) {
                await this.#service.registerClient(saleId, phone);
                response.json({saleId})
            }else{
                response.json({saleId:client?.saleId})
            }
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}