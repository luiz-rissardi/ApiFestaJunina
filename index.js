
import express from 'express';
import http from "http";
import { promisify } from 'util';
// import cors from "cors"
import dotenv from "dotenv"

import { loggers,bodyParse,RateLimit } from "./server/helpers/helper.js"
// import { MySqlDatabase } from './server/data/MySqlDataBase.js';
import { RoutesOfApi } from './server/routes/routes.js';
import { OrderFactory } from './server/components/order/OrderFactory.js';
import { OrderProdutsFactory } from './server/components/orderProducts/OrderProdutsFactory.js';
import { ProductFactory } from './server/components/product/ProductFactory.js';
import { UserFactory } from './server/components/users/UserFactory.js';
import { ClientFactory } from './server/components/clients/clientFactory.js';
import { CommandFactory } from './server/components/commands/CommandsFactory.js';

dotenv.config();

export class Server{
    static createServer(){
        const app = express();
        const server = http.createServer(app);
        // const routes = Server.#instanceDependeces();
        // const database = MySqlDatabase.build(process.env.CONNECTION_STRING);

        // app.use(cors({
        //     origin: 'http://localhost:4200'
        // }))

        app.get("/api",(req,res)=>{
            res.write("ola")
            res.end();
        })
        
        // app.use("/api",RateLimit,bodyParse)
        server.listen(process.env.PORT || 3000, ()=>{
            // loggers.info(`Server is running at port ${process.env.PORT}`);
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

