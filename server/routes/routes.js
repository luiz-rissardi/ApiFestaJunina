import { Router } from "express";


export class RoutesOfApi {
    #shoppingController;
    #productSalesController;
    #stockController;
    #userController;
    #clientController;
    #twilioController;
    constructor({ shoppingController, productSalesController, stockController, userController, clientController,twilioController }) {
        this.#shoppingController = shoppingController;
        this.#productSalesController = productSalesController;
        this.#stockController = stockController;
        this.#userController = userController;
        this.#clientController = clientController;
        this.#twilioController = twilioController;
    }

    getRoutes() {
        const allroutes = Router();
        allroutes.use(this.#routesOfProductSalesController());
        allroutes.use(this.#routesOfShoppingController());
        allroutes.use(this.#routesOfStockController());
        allroutes.use(this.#routesOfUserController());
        allroutes.use(this.#routesOfClient());
        allroutes.use(this.#routesOfMessagesController());
        return allroutes
    }

    #routesOfClient() {
        const routes = Router();
        routes.route("/client").post((req, res) => this.#clientController.handlerClient(req, res));
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

    #routesOfProductSalesController() {
        const routes = Router();

        routes.route("/product/sale/:saleId&:productId")
            .get((req, res) => {
                this.#productSalesController.getProductSales(req, res)
            })

        routes.route("/product/sale")
            .post((req, res) => {
                this.#productSalesController.insertProducts(req, res)
            })

        routes.route("/product/sale/remove").post((req, res) => {
            this.#productSalesController.recordProductSales(req, res)
        })

        // busca os top $ produtos das vendas
        routes.route("/product/top")
            .get((req, res) => {
                this.#productSalesController.getTopProductsOfSales(req, res);
            })

        routes.route("/product/top/:rank")
            .get((req, res) => {
                this.#productSalesController.getTopProductsOfSales(req, res);
            })


        return routes
    }

    #routesOfStockController() {
        const routes = Router();

        routes.route("/product")
            .get((req, res) => {
                this.#stockController.getAllProductsInStock(req, res)
            })
            .post((req, res) => {
                this.#stockController.createProduct(req, res)
            })
            .put((req, res) => {
                this.#stockController.updateProduct(req, res)
            })

        routes.route("/product/substraction").post((req, res) => {
            this.#stockController.substractionStock(req, res)
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

    #routesOfMessagesController() {
        const routes = Router();

        routes.route("/message").post((req, res) => {
            this.#twilioController.sendQrCodeTo(req, res);
        })

        return routes
    }
}