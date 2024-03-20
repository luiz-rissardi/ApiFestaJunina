
import express from 'express';
import http from "http";
import { promisify } from 'util';
import cors from "cors"
import configEnv from './helpers/config.js';

import { loggers,bodyParse,RateLimit } from "./helpers/helper.js"
import { MySqlDatabase } from './data/MySqlDataBase.js';
import { RoutesOfApi } from './routes/routes.js';
import { OrderFactory } from './components/order/OrderFactory.js';
import { OrderProdutsFactory } from './components/orderProducts/OrderProdutsFactory.js';
import { ProductFactory } from './components/product/ProductFactory.js';
import { UserFactory } from './components/users/UserFactory.js';
import { ClientFactory } from './components/clients/clientFactory.js';
import { CommandFactory } from './components/commands/CommandsFactory.js';

export class Server{
    static createServer(){
        const app = express();
        const server = http.createServer(app);
        const routes = Server.#instanceDependeces();
        const database = MySqlDatabase.build(configEnv.CONNECTION_STRING);

        app.use(cors({
            origin: 'http://localhost:4200'
        }))
        
        app.use("/api",RateLimit,bodyParse,routes)
        server.listen(configEnv.PORT,async ()=>{
            loggers.info(`Server is running at port ${configEnv.PORT}`);
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
        database.end( (err) =>{
            if(err) 
                loggers.error("erro ao fechar banco de dados");
            loggers.info("banco de dados fechado!");
        })
        loggers.info("----------SERVIDOR-----------");
        loggers.info("fechando servidor...");
        await promisify(server.close.bind(server))();
        loggers.info("servidor fechado!")
        loggers.info("----------Encerrando-----------");
        process.exit(0)
    }

    static #instanceDependeces(){
        const orderController = OrderFactory.createInstance();
        const ordersProductController = OrderProdutsFactory.createInstance();
        const productController = ProductFactory.createInstance();
        const userController = UserFactory.createInstance();
        const clientController = ClientFactory.createInstance();
        const commandController = CommandFactory.createInstance();
        const routes = new RoutesOfApi({ commandController, orderController, ordersProductController, productController, userController,clientController }).getRoutes();
        return routes
    }
}

Server.createServer();

