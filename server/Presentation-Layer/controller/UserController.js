
export class UserController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async login(request,response){
        try {
            const { userName, password } = request.body;
            const account = await this.#service.login(userName,password);
            response.json(account)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async changePassword(request,response){
        try {
            const { newPassword } = request.body;
            const result = await this.#service.changePassword(1,newPassword);
            response.write(result)
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
            response.write(result);
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

}