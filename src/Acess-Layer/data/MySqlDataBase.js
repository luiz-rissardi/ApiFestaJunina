import { createPool } from "mysql2";

export class MySqlDatabase {
    connection ;

    static build(connectionString) {
        try {
            if (!this.connection) {
                this.connection = createPool(connectionString)
                return this.connection;
            }
            return this.connection
        } catch (error) {
            console.log(error);
            throw new Error(error.message);
        }
    }
}
