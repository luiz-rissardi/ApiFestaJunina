
import express from 'express';
import http from "http";
import { promisify } from 'util';
import { config } from 'dotenv'; 

import { loggers,bodyParse } from "./helpers/helper.js"
import { MySqlDatabase } from './Acess-Layer/data/MySqlDataBase.js';
import { RoutesOfShopping } from './Presentation-Layer/routes/routes.js';
import { ShoppingController } from './Presentation-Layer/controller/ShoppingController.js';
import { ShoppingFactory } from './Bussines-Layer/factory/ShoppingFactory.js';

config()

export class Server{
    static createServer(){
        const app = express();
        const routes = Server.#instanceDependeces();
        app.use("/api",bodyParse,routes)
        const server = http.createServer(app);
        const database = MySqlDatabase.build(process.env.CONNECTION_STRING);
        server.listen(process.env.PORT,async ()=>{
            loggers.info(`Server is running at port ${process.env.PORT}`);
            loggers.info(`url é ${process.env.API_URL}`)
            const events = ["SIGINT","SIGTERM"];
            events.forEach(event =>{
                process.on(event,()=>{
                    Server.#destroyServer(database,server)
                })
            })
        })
    }

    static async #destroyServer(database,server){
        loggers.info("----------BANCO DE DADOS---------")
        loggers.info("fechando banco de dados...");
        await promisify(database.end.bind(database))()
        loggers.info("banco de dados fechado!");
        loggers.info("----------SERVIDOR-----------");
        loggers.info("fechando servidor...");
        await promisify(server.close.bind(server))();
        loggers.info("servidor fechado!")
        loggers.info("----------Encerrando-----------");
        process.exit(0)
    }

    static #instanceDependeces(){
        const service = ShoppingFactory.createInstance();
        const controller = new ShoppingController({ service });
        const routes = new RoutesOfShopping(controller).getRoutes();
        return routes
    }
}

Server.createServer();
