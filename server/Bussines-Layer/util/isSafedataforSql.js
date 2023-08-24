
const FORBIDDEN_KEYS = ["SELECT", "INSERT", "CREATE", "DROP", "DELETE", "UPDATE"]

export function isSafeDataforSql(...params) {
    const isSafeSqlParams = params
        .map(el => el?.toString())
        .filter(param => FORBIDDEN_KEYS.includes(param?.toLocaleUpperCase()))
        .every(el => el === true)
    if (isSafeSqlParams) {
        return true;
    }
    throw new Error(`dados inválidos fóram detectados! "${[...arguments]}" `)
}