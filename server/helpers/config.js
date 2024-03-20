import env from "env-var"

const configEnv = {
    HASHED_SALT: env.get("HASHED_SALT").required().asString(),
    HASHED_SALT_CODE_USER: env.get("HASHED_SALT_CODE_USER").required().asString(),
    PORT: env.get("PORT").required().asInt(),
    CONNECTION_STRING: env.get("CONNECTION_STRING").required().asUrlString()
};

export default configEnv