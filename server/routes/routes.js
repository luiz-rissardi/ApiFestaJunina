import { Router } from "express";


export class RoutesOfApi {
    #orderController;
    #ordersProductController;
    #productController;
    #userController;
    #clientController;
    #commandController;
    constructor({ commandController, orderController, ordersProductController, productController, userController, clientController }) {
        this.#orderController = orderController;
        this.#ordersProductController = ordersProductController;
        this.#productController = productController;
        this.#userController = userController;
        this.#clientController = clientController;
        this.#commandController = commandController;
    }

    getRoutes() {
        const allroutes = Router();
        allroutes.use(this.#routesOfOrderProductsController());
        allroutes.use(this.#routesOfOrderController());
        allroutes.use(this.#routesOfProductController());
        allroutes.use(this.#routesOfUserController());
        allroutes.use(this.#routesOfClient());
        allroutes.use(this.#routesOfCommands());
        return allroutes
    }

    #routesOfCommands() {
        const routes = Router();

        routes.route("/command/:commandId")
            .get((req, res) => this.#commandController.getCommandById(req, res));

        routes.route("/command")
            .get((req, res) => this.#commandController.getAvaibleCommand(req, res))
            .post((req, res) => this.#commandController.getCommandByUrl(req, res))
            .patch((req, res) => this.#commandController.patchCommand(req, res))

        routes.route("/command/inactive")
            .post((req, res) => this.#commandController.inactiveCommand(req, res))

        return routes
    }

    #routesOfClient() {
        const routes = Router();
        routes.route("/client")
            .post((req, res) => this.#clientController.handlerClient(req, res));

        routes.route("/client/:phone")
            .get((req, res) => this.#clientController.getClient(req, res));

        routes.route("/client/:command")
            .get((req, res) => this.#clientController.findEByCommand(req, res));

        return routes;
    }

    #routesOfOrderController() {
        const routes = Router()

        routes.route("/order/:dateInitial/:dateEnded").get((req, res) => {
            this.#orderController.getBetweenDate(req, res)
        })

        routes.route("/order/count").get((req, res) => {
            this.#orderController.getCountTotalOrders(req, res)
        })

        routes.route("/order")
            .post((req, res) => {
                this.#orderController.createOrder(req, res)
            })
            .put((req, res) => {
                this.#orderController.putCommandInOrder(req, res)
            })
            .patch((req, res) => {
                this.#orderController.inativeOrder(req, res)
            })

        return routes
    }

    #routesOfOrderProductsController() {
        const routes = Router();

        //buscar um produto da venda
        routes.route("/order/product/:orderId&:productId")
            .get((req, res) => {
                this.#ordersProductController.getProductOfOrder(req, res)
            })

        //buscar todos os produtos da venda
        routes.route("/order/products/:orderId")
            .get((req, res) => {
                this.#ordersProductController.getAllProductOfOrder(req, res)
            })

        routes.route("/order/products")
            .post((req, res) => {
                this.#ordersProductController.insertProductsIntoOrder(req, res)
            })
            .put((req, res) => {
                this.#ordersProductController.recordOrders(req, res)
            })
            .patch((req, res) => {
                this.#ordersProductController.refoundOrderProduts(req,res)
            })


        // busca os top $ produtos das vendas
        routes.route("/order/product/top")
            .get((req, res) => {
                this.#ordersProductController.getTopOrdersProduct(req, res);
            })

        routes.route("/order/product/top/:rank")
            .get((req, res) => {
                this.#ordersProductController.getTopOrdersProduct(req, res);
            })


        return routes
    }

    #routesOfProductController() {
        const routes = Router();

        routes.route("/product")
            .get((req, res) => {
                this.#productController.getAllProducts(req, res)
            })
            .post((req, res) => {
                this.#productController.createProduct(req, res)
            })
            .put((req, res) => {
                this.#productController.updateProduct(req, res)
            })
            .patch((req, res) => {
                this.#productController.addQuantityProduct(req, res);
            })

        routes.route("/product/substraction").post((req, res) => {
            this.#productController.substractionProduct(req, res)
        })



        return routes
    }

    #routesOfUserController() {
        const routes = Router();

        routes.route("/auth").post((req, res) => {
            this.#userController.login(req, res);
        })

        routes.route("/user").post((req, res) => {
            this.#userController.createAccount(req, res);
        })

        routes.route("/user/password").put((req, res) => {
            this.#userController.changePassword(req, res)
        })

        routes.route("/user/username").put((req, res) => {
            this.#userController.changeUserName(req, res)
        })

        return routes
    }
}