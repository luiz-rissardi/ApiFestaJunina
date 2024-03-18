
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
            const [command] = await connection.query("SELECT * FROM commands WHERE commandId = ?", [commandId]);
            connection.release();
            return command
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async findByCommandUrl(commandUrl) {
        try {
            const connection = await this.#connect();
            const [command] = await connection.query("SELECT * FROM commands WHERE commandUrl = ?", [commandUrl]);
            connection.release();
            return command
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async putCommand(commandId,value) {
        try {
            const connection = await this.#connect();
            await connection.query("UPDATE commands set avaible = ? WHERE commandId = ?",[value,commandId]);
            connection.release();
            return;
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async getAvaibleCommand(){
        try {
            const connection = await this.#connect();
            const [command] = await connection.query("SELECT * from commands WHERE avaible = true");
            connection.release();
            return command
        } catch (error) {
            throw new Error(error.message)
        }
    }

}
