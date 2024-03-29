import { ClientController } from "./ClientController.js";
import { ClientRepository } from "./ClientRepository.js";
import { ClientService } from "./ClientService.js";
import { MySqlDatabase } from "../../data/MySqlDataBase.js";

export class ClientFactory {
    static createInstance() {
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
            const repository = new ClientRepository({ connection });
            const service = new ClientService({ repository });
            return new ClientController({ service });
        } catch (error) {
            console.log(error);
            throw new Error("não foi possivel construir o ClientController");
        }
    }
}