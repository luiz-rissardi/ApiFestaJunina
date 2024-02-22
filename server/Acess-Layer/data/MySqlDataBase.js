import { createPool } from "mysql2";
import { loggers } from "../../helpers/helper.js";

export class MySqlDatabase {
    connection ;

    static build(connectionString) {
        try {
            if (!this.connection) {
                console.log("conectando ...");
                this.connection = createPool(connectionString)
                console.log("banco conectado");
                return this.connection;
            }
            return this.connection
        } catch (error) {
            loggers.error(error)
            throw new Error(error.message);
        }
    }
}
