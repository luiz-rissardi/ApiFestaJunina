
export class ShoppingController{
    #service;
    constructor({ service }){
        this.#service = service;
    }

    async getSalesAfterDate(request,response){
        try {
            const {date} = request.query;
            const data = await this.#service.findSalesAfterDate(String(date));
            response.write(JSON.stringify(data))
        } catch (error) {
            console.log(error);
            response.writeHead(500)
        }finally{
            response.end();
        }
    }
}