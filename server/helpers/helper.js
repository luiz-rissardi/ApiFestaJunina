import { createLogger, format, transports } from 'winston';
import rateLimit from 'express-rate-limit';

const typeOfLogs = createLogger({
    level: 'debug', // Defina o nível de log desejado (pode ser 'debug', 'info', 'warn', 'error', etc.)
    format: format.combine(
        format.colorize(),
        format.timestamp(),
        format.printf(({ level, timestamp, message }) => {
            return `${DateFormat(timestamp)} ${level}: ${message}`;
        })
    ),
    transports: [new transports.Console],
});

function DateFormat(date) {
    const parsedDate = new Date(date);
    return parsedDate.toISOString()
        .replace("T", " ")
        .replace(/.\w{4}$/, "")
}

const loggers = {
    info: typeOfLogs.info.bind(this),
    warn: typeOfLogs.warn.bind(this),
    error: typeOfLogs.error.bind(this),
}


function bodyParse(request, response, next) {

    if (request.method === "GET") {
        next()
    } else {
        let body = '';
        function getBody(chunk) {
            body += chunk.toString();
        }

        function appendToBodyRequest() {
            request.body = JSON.parse(body || '{}');
            request.removeListener("data", getBody);
            request.removeListener("end", appendToBodyRequest);
            next()
        }

        request.on("data", getBody);
        request.on("end", appendToBodyRequest);
    }
}

function acceptDefaultDomain(req, res, next) {
    next();
}

const RateLimit = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: 150, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
    standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
})

export {
    loggers,
    bodyParse,
    DateFormat,
    RateLimit
};
