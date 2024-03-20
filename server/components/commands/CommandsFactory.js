import { MySqlDatabase } from "../../data/MySqlDataBase.js";
import { CommandsRepository } from "./commandsRepository.js";
import { CommandController } from "./CommandController.js";
import { CommandService } from "./CommandService.js";
import configEnv from "../../helpers/config.js";

export class CommandFactory{
    static createInstance(){
        try {
            const connection = MySqlDatabase.build(configEnv.CONNECTION_STRING);
        const repository = new CommandsRepository({ connection });
        const service = new CommandService({ repository })
        return new CommandController({ service });
        } catch (error) {
            throw new Error("não doi possivel criar CommandController")
        }
    }
}