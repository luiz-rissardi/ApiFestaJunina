
export class StockController{
    #service;
    constructor({ service }){
        this.#service = service;
    }

    async getAllProductsInStock(request,response){
        try {
            const data = await this.#service.findAllProductsInStock();
            response.status(200).json(data)
        } catch (error) {
            response.writeHead(500)
        }finally{
            response.end()
        }
    }

    async createProduct(request,response){
        try {
            const product = request.body;
            const result = await this.#service.createProduct(product)
            response.write(result)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async updateProduct(request,response){
        try {
            const { productId, product } = request.body;
            const result = await this.#service.updateProduct(productId,product)
            response.write(result)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }
}