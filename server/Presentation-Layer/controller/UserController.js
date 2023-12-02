
export class UserController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async login(request,response){
        try {
            const { userName, password } = request.body;
            const account = await this.#service.login(userName,password);
            response.status(200).json(account)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async changePassword(request,response){
        try {
            const { userName, password} = request.body;
            const result = await this.#service.changePassword(userName,password);
            response.status(201).json(result)
        } catch (error) {
            response.writeHead();
        }finally{
            response.end();
        }
    }

    async changeUserName(request,response){
        try {
            const { newUserName } = request.body;
            const result = await this.#service.changeUserName(1,newUserName);
            response.status(201).json(result)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async createAccount(request,response){
        try {
            const { userName,password,productIdAnexed } = request.body;
            const result = await this.#service.createAccount(userName,password,productIdAnexed);
            response.status(201).json(result);
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

}