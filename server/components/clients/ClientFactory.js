import { ClientController } from "./ClinentController.js";
import { ClientRepository } from "./clientRepository.js";
import { ClientService } from "./clientService.js";
import { MySqlDatabase } from "../../data/MySqlDataBase.js";

export class ClientFactory {
    static createInstance() {
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
            const repository = new ClientRepository({ connection });
            const service = new ClientService({ repository });
            return new ClientController({ service });
        } catch (error) {
            throw new Error("não foi possivel construir o ClientController");
        }
    }
}