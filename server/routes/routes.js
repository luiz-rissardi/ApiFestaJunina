import { Router } from "express";


export class RoutesOfApi {
    #OrderController;
    #OrdersProductController;
    #productController;
    #userController;
    #clientController;
    constructor({ OrderController, ordersProductController, productController, userController, clientController }) {
        this.#OrderController = OrderController;
        this.#OrdersProductController = ordersProductController;
        this.#productController = productController;
        this.#userController = userController;
        this.#clientController = clientController;
    }

    getRoutes() {
        const allroutes = Router();
        allroutes.use(this.#routesOfOrderProductsController());
        allroutes.use(this.#routesOfOrderController());
        allroutes.use(this.#routesOfProductController());
        allroutes.use(this.#routesOfUserController());
        allroutes.use(this.#routesOfClient());
        return allroutes
    }

    #routesOfClient() {
        const routes = Router();
        routes.route("/client").post((req, res) => this.#clientController.handlerClient(req, res));
        routes.route("/client/:command").get((req, res) => this.#clientController.findbyCommand(req, res));
        return routes;
    }

    #routesOfOrderController() {
        const routes = Router()

        routes.route("/order/:dateInitial/:dateEnded").get((req, res) => {
            this.#OrderController.getBetweenDate(req, res)
        })

        routes.route("/order/count").get((req, res) => {
            this.#OrderController.getCountTotalOrders(req, res)
        })

        routes.route("/order").post((req, res) => {
            this.#OrderController.createOrder(req, res)
        })

        return routes
    }

    #routesOfOrderProductsController() {
        const routes = Router();

        routes.route("/order/product/:orderId&:productId")
            .get((req, res) => {
                this.#OrdersProductController.getOrdersProduct(req, res)
            })

        routes.route("/order/product")
            .post((req, res) => {
                this.#OrdersProductController.insertProductsIntoOrder(req, res)
            })
            .put((req, res) => {
                this.#OrdersProductController.recordOrders(req, res)
            })

        // busca os top $ produtos das vendas
        routes.route("/order/product/top")
            .get((req, res) => {
                this.#OrdersProductController.getTopOrdersProduct(req, res);
            })

        routes.route("/order/product/top/:rank")
            .get((req, res) => {
                this.#OrdersProductController.getTopOrdersProduct(req, res);
            })


        return routes
    }

    #routesOfProductController() {
        const routes = Router();

        routes.route("/product")
            .get((req, res) => {
                this.#productController.getAllProductsInProduct(req, res)
            })
            .post((req, res) => {
                this.#productController.createProduct(req, res)
            })
            .put((req, res) => {
                this.#productController.updateProduct(req, res)
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