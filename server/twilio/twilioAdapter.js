import { loggers } from "../helpers/helper.js";
import twilio from "twilio";



export class TwilioAdapter {
    #twilio;
    constructor({ accoutSid, authToken }) {
        this.#twilio = twilio(accoutSid, authToken)
    }

    sendQrCodeMessage(to, from, qrCodeUrl) {
        try {
            from = "+" + from;
            to = "+55" + to;
            console.log(to , "+554195524777");
            this.#twilio.messages.create({
                body: "parabéns por comprar conosco, aqui esta seu QR code para usar e retirar os seus itens",
                // mediaUrl:qrCodeUrl,

                from: `whatsapp:+14155238886`,// numero do if
                to: `whatsapp:${to}`, // numero do cliente
            })
        } catch (error) {
            loggers.error(`TwilioAdapter => sendQrCodeMessage => Error ao enviar Qr code para o clinte ${error.message}`)
            throw new Error("Error ao enviar Qr code para o clinte");
        }
    }
}