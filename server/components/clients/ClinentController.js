

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
                const command = await this.#service.registerClient(orderId, phone);
                response.status(200).json({orderId, command})
            }else{
                response.status(200).json({orderId:client?.orderId, command: client?.command})
            }
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async findbyCommand(request,response){
        try {
            const { command } = request.params;
            const result = await this.#service.getClientByCommand(command);
            response.status(200).json(result);
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end()
        }
    }
}