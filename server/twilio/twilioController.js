



export class TwilioController{

    #service 
    constructor(service) {
        this.#service = service;
    }

    sendQrCodeTo(request,response){
        try {
            const { to,from,qrCodeUrl } = request.body;
            this.#service.sendQrCodeMessage(to,from,qrCodeUrl)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.status(204).end();
        }
    }
}