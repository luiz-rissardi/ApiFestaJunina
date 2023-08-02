import { Router } from "express";

export class RoutesOfShopping{
    #controller
    constructor(controller) {
        this.#controller = controller;
    }
    getRoutes(){
        const routes = Router()
        routes.route("/teste").get((req,res)=>{
            this.#controller.getSalesAfterDate(req,res)
        })
        return routes
    }
}