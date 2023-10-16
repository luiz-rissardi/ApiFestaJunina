import { createLogger, format, transports } from 'winston';

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


async function bodyParse(request, response, next) {

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

        await request.on("data", getBody);
        await request.on("end", appendToBodyRequest);
    }
}

function AcceptDefaultDomain(req, res, next) {
    next();
}

export {
    loggers,
    bodyParse,
    DateFormat,
    AcceptDefaultDomain
};
