import { MySqlDatabase } from "../../data/MySqlDataBase.js";
import { CommandsRepository } from "./commandsRepository.js";
import { CommandController } from "./CommandController.js";
import { CommandService } from "./CommandService.js";

export class CommandFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(process.env.CONNECTION_STRING);
        const repository = new CommandsRepository({ connection });
        const service = new CommandService({ repository })
        return new CommandController({ service });
        } catch (error) {
            throw new Error("não doi possivel criar CommandController")
        }
    }
}