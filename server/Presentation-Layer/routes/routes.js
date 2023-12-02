import { Router } from "express";
import cors from "cors"

export class RoutesOfApi {
    #shoppingController;
    #productSalesController;
    #stockController;
    #userController;
    constructor({ shoppingController, productSalesController, stockController, userController }) {
        this.#shoppingController = shoppingController;
        this.#productSalesController = productSalesController;
        this.#stockController = stockController;
        this.#userController = userController;
    }

    getRoutes() {
        const allroutes = Router();
        allroutes.use(this.#routesOfProductSalesController());
        allroutes.use(this.#routesOfShoppingController());
        allroutes.use(this.#routesOfStockController());
        allroutes.use(this.#routesOfUserController());
        return allroutes
    }

    #routesOfShoppingController() {
        const routes = Router()

        routes.route("/getSalesBetweenDate/:dateInitial/:dateEnded").get((req, res) => {
            this.#shoppingController.getBetweenDate(req, res)
        })

        routes.route("/getTotalCoutOfSales").get((req, res) => {
            this.#shoppingController.getCountTotalSales(req, res)
        })

        routes.route("/insertNewSale").post((req, res) => {
            this.#shoppingController.createSale(req, res)
        })

        return routes
    }

    #routesOfProductSalesController() {
        const routes = Router();

        routes.route("/insertProducts").post((req, res) => {
            this.#productSalesController.insertProducts(req, res)
        })

        return routes
    }

    #routesOfStockController() {
        const routes = Router();

        routes.route("/getAllProducts").get((req, res) => {
            this.#stockController.getAllProductsInStock(req, res)
        })

        routes.route("/substractionStock").post((req,res)=>{
            this.#stockController.substractionStock(req,res)
        })

        routes.route("/createProduct").post((req, res) => {
            this.#stockController.createProduct(req, res)
        })

        routes.route("/updateProduct").put((req, res) => {
            this.#stockController.updateProduct(req, res)
        })

        return routes
    }

    #routesOfUserController() {
        const routes = Router();

        routes.route("/login").post((req, res) => {
            this.#userController.login(req, res);
        })

        routes.route("/createAccount").post((req,res)=>{
            this.#userController.createAccount(req,res);
        })

        routes.route("/updatePassword").put((req, res) => {
            this.#userController.changePassword(req, res)
        })

        routes.route("/upadateUserName").put((req,res)=>{
            this.#userController.changeUserName(req,res)
        })

        return routes
    }
}