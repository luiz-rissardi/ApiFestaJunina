
import express from 'express';
import http from "http";
import { promisify } from 'util';
import { config } from 'dotenv'; 
import cors from "cors"


import { loggers,bodyParse,AcceptDefaultDomain } from "./helpers/helper.js"
import { MySqlDatabase } from './Acess-Layer/data/MySqlDataBase.js';
import { RoutesOfApi } from './Presentation-Layer/routes/routes.js';
import { ShoppingFactory } from './Bussines-Layer/factory/ShoppingFactory.js';
import { ProductSalesFactory } from './Bussines-Layer/factory/ProductSalesFactory.js';
import { StockFactory } from './Bussines-Layer/factory/StockFactory.js';
import { UserFactory } from './Bussines-Layer/factory/UserFacktory.js';

config()

export class Server{
    static createServer(){
        const app = express();
        const server = http.createServer(app);
        const routes = Server.#instanceDependeces();
        const database = MySqlDatabase.build(process.env.CONNECTION_STRING);

        app.use(cors({
            origin: 'http://localhost:4200'
        }))
        app.use("/api",bodyParse,routes)
        server.listen(process.env.PORT,async ()=>{
            loggers.info(`Server is running at port ${process.env.PORT}`);
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
        const shoppingController = ShoppingFactory.createInstance();
        const productSalesController = ProductSalesFactory.createInstance();
        const stockController = StockFactory.createInstance();
        const userController = UserFactory.createInstance();
        const routes = new RoutesOfApi({ shoppingController, productSalesController, stockController, userController }).getRoutes();
        return routes
    }
}

Server.createServer();

