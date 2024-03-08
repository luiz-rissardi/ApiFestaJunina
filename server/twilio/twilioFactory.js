import { TwilioAdapter } from "./twilioAdapter.js"
import { TwilioController } from "./twilioController.js"

export class TwilioFactory{
    static createInstance(){
        try {
            const service = new TwilioAdapter({accoutSid:process.env.ACCOUNT_SID, authToken:process.env.AUTH_TOKEN});
            const controller = new TwilioController(service);
            return controller;
        } catch (error) {
            throw new Error("não doi possivel criar StockService")
        }
    }
}