
export class CommandsRepository {
    #connection
    constructor({ connection }) {
        this.#connection = connection
    }

    async #connect() {
        try {
            return await this.#connection.promise().getConnection();
        } catch (error) {
            throw new Error("não foi possivel realizar conexão")
        }
    }

    async findByCommandId(commandId) {
        try {
            const connection = await this.#connect();
            const [command] = await connection.query("SELECT * FROM commands WHERE commandId = ? and valid = true", [commandId]);
            connection.release();
            return command
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByCommandUrl(commandUrl) {
        try {
            const connection = await this.#connect();
            const [[command]] = await connection.query("SELECT * FROM commands WHERE commandUrl = ? and valid = true", [commandUrl]);
            connection.release();
            return command
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async putCommand(commandId, value) {
        try {
            const connection = await this.#connect();
            await connection.query("UPDATE commands set avaible = ?,valid = true WHERE commandId = ?", [value, commandId]);
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAvaibleCommand() {
        try {
            const connection = await this.#connect();
            const [command] = await connection.query("SELECT * from commands WHERE avaible = true and valid = true");
            connection.release();
            return command
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAll() {
        try {
            const connection = await this.#connect();
            const [commands] = await connection.query("SELECT * from commands");
            connection.release();
            return commands
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async inactiveCommand(commandId) {
        try {
            const connection = await this.#connect();
            await connection.query(`UPDATE commands SET valid = false WHERE commandId = ?`, [commandId]);
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async createMany(commandsUrl) {
        try {
            const connection = await this.#connect();
            connection.beginTransaction();
            const commandsIds = []
            for (let commandUrl of commandsUrl) {
                const [command] = await connection.query(`INSERT INTO commands
                (commandUrl,avaible,valid) VALUES(?,true,true)
                `, [commandUrl]);
                commandsIds.push(command.insertId);
            }
            await connection.commit();
            connection.release();
            return commandsIds;
        } catch (error) {
            throw new Error(error.message);
        }
    }

}
