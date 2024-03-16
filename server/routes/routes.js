import { Router } from "express";


export class RoutesOfApi {
    #shoppingController;
    #OrdersController;
    #productController;
    #userController;
    #clientController;
    constructor({ shoppingController, ordersController, productController, userController, clientController }) {
        this.#shoppingController = shoppingController;
        this.#OrdersController = ordersController;
        this.#productController = productController;
        this.#userController = userController;
        this.#clientController = clientController;
    }

    getRoutes() {
        const allroutes = Router();
        allroutes.use(this.#routesOfOrderController());
        allroutes.use(this.#routesOfShoppingController());
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

    #routesOfShoppingController() {
        const routes = Router()

        routes.route("/sale/:dateInitial/:dateEnded").get((req, res) => {
            this.#shoppingController.getBetweenDate(req, res)
        })

        routes.route("/sale/count").get((req, res) => {
            this.#shoppingController.getCountTotalSales(req, res)
        })

        routes.route("/sale").post((req, res) => {
            this.#shoppingController.createSale(req, res)
        })

        return routes
    }

    #routesOfOrderController() {
        const routes = Router();

        routes.route("/product/sale/:orderId&:productId")
            .get((req, res) => {
                this.#OrdersController.getOrders(req, res)
            })

        routes.route("/product/sale")
            .post((req, res) => {
                this.#OrdersController.insertProductsIntoOrder(req, res)
            })

        routes.route("/product/sale/remove")
            .post((req, res) => {
                this.#OrdersController.recordOrders(req, res)
            })

        // busca os top $ produtos das vendas
        routes.route("/product/top")
            .get((req, res) => {
                this.#OrdersController.getTopOrders(req, res);
            })

        routes.route("/product/top/:rank")
            .get((req, res) => {
                this.#OrdersController.getTopOrders(req, res);
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