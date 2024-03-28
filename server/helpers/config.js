import dotenv from "dotenv"

dotenv.config();

const configEnv = {
    HASHED_SALT: process.env.HASHED_SALT,
    HASHED_SALT_CODE_USER: process.env.HASHED_SALT_CODE_USER,
    PORT: process.env.PORT,
    CONNECTION_STRING: process.env.CONNECTION_STRING
};

export default configEnv