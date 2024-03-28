
import express, { Router } from 'express';
import http from "http";
// import { promisify } from 'util';
// // import cors from "cors"
// import dotenv from "dotenv"

// dotenv.config()

// import { loggers, bodyParse, RateLimit } from "./server/helpers/helper.js"
// import { MySqlDatabase } from './server/data/MySqlDataBase.js';
// import { RoutesOfApi } from './server/routes/routes.js';
// import { OrderFactory } from './server/components/order/OrderFactory.js';
// import { OrderProdutsFactory } from './server/components/orderProducts/OrderProdutsFactory.js';
// import { ProductFactory } from './server/components/product/ProductFactory.js';
// import { UserFactory } from './server/components/users/UserFactory.js';
// import { ClientFactory } from './server/components/clients/clientFactory.js';
// import { CommandFactory } from './server/components/commands/CommandsFactory.js';

// export class Server {
//     static createServer() {
//         const app = express();
//         const server = http.createServer(app);
//         // const routes = Server.#instanceDependeces();
//         // const database = MySqlDatabase.build(process.env.CONNECTION_STRING);

//         // app.use(cors({
//         //     origin: 'http://localhost:4200'
//         // }))

//         // app.use("/api",RateLimit,bodyParse,routes)
//         server.listen(3000, () => {
//             console.log(`Server is running at port 3000`);
//             // const events = ["SIGINT","SIGTERM"];
//             // events.forEach(event =>{
//             //     process.on(event,()=>{
//             //         Server.#destroyServer(database,server)
//             //     })
//             // })
//         })

//         const routes = Router();

//         routes.route("/product").get((req, res) => {
//             res.status(200).json({
//                 productName: "pipoca",
//                 productId: 3,
//                 price: 8.78,
//                 quantity: 89
//             })
//         })

//         app.use("/api", routes)
//     }

//     static async #destroyServer(database, server) {
//         loggers.info("----------BANCO DE DADOS---------")
//         loggers.info("fechando banco de dados...");
//         database.end((err) => {
//             if (err)
//                 loggers.error("erro ao fechar banco de dados");
//             loggers.info("banco de dados fechado!");
//         })
//         loggers.info("----------SERVIDOR-----------");
//         loggers.info("fechando servidor...");
//         await promisify(server.close.bind(server))();
//         loggers.info("servidor fechado!")
//         loggers.info("----------Encerrando-----------");
//         process.exit(0)
//     }

//     static #instanceDependeces() {
//         const orderController = OrderFactory.createInstance();
//         const ordersProductController = OrderProdutsFactory.createInstance();
//         const productController = ProductFactory.createInstance();
//         const userController = UserFactory.createInstance();
//         const clientController = ClientFactory.createInstance();
//         const commandController = CommandFactory.createInstance();
//         const routes = new RoutesOfApi({ commandController, orderController, ordersProductController, productController, userController, clientController }).getRoutes();
//         return routes
//     }
// }

// Server.createServer();


const app = express();
const server = http.createServer(app);
server.listen(3000, () => {
    console.log(`Server is running at port 3000`);
})

const routes = Router();

routes.route("/product").get((req, res) => {
    res.status(200).json({
        productName: "pipoca",
        productId: 3,
        price: 8.78,
        quantity: 89
    })
})

app.use("/api", routes)



