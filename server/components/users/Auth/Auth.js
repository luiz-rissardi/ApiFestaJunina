import crypto from "crypto";
import configEnv from "../../../helpers/config.js";

export class AuthService {

    static encryptPassword(password) {
        const hash = crypto
            .pbkdf2Sync(password, configEnv.HASHED_SALT, 100000, 64, 'sha256')
            .toString('hex');
        return hash;
    }
}
