

export class CommandController {
    #service;
    constructor({ service }) {
        this.#service = service;
    }

    async generateCommandBatch(request,response){
        try {
            const result = await this.#service.generateCommandBatch();
            response.status(201).json(result)
        } catch (error) {
            response.writeHead(500);
        }finally{
            response.end();
        }
    }

    async getCommandById(request, response) {
        try {
            const { commandId } = request.params;
            const command = await this.#service.getCommandById(commandId);
            response.status(200).json(command)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getCommandByUrl(request, response) {
        try {
            const { commandUrl } = request.body;
            const command = await this.#service.getCommandByUrl(commandUrl);
            response.status(200).json(command)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }


    async patchCommand(request, response) {
        try {
            const { commandId, avaible } = request.body;
            const result = await this.#service.updateCommand(commandId, avaible);
            response.status(200).json(result)
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async getAvaibleCommand(request, response) {
        try {
            const command = await this.#service.getNextAvaibleCommand();
            response.status(200).json(command);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }

    async inactiveCommand(request, response) {
        try {
            const { commandId } = request.body;
            const result = await this.#service.inactiveCommand(commandId);
            response.json(result);
        } catch (error) {
            response.writeHead(500);
        } finally {
            response.end();
        }
    }
}