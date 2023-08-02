import crypto from "crypto";


export class AuthService {
    constructor() {
    }

    encryptPassword(password) {
        const hash = crypto
            .pbkdf2Sync(password, process.env.HASHED_SALT, 100000, 64, "sha-256")
            .toString("hex")
        return hash;
    }

    
}