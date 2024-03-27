import { isSafeDataforSql } from "../isSafedataforSql.js";

export class ValidateFieldsTemplateMethod {

    mesageErrors = [];
    #typeOfSchema = {}
    constructor({ typeOfSchema }) {
        this.#typeOfSchema = typeOfSchema;
    }

    validate(field, value) {
        return this.#_isEmpty(value, field) &&
            this.#_validateFieldExist(field) &&
            this.#_validateTypeValue(field, value) &&
            this.#_validadeLengthOfValues(field, value) &&
            isSafeDataforSql(value)
    }

    #_validateFieldExist(field) {
        let isValid = false;
        for (let itens of Object.keys(this.#typeOfSchema)) {
            if (itens == field) {
                isValid = true;
                break;
            }
        }
        if (!isValid) {
            this.mesageErrors.push(`\n o nome do campo ${field} é invalido`)
            return false
        }
        return isValid
    }

    #_validateTypeValue(fieldTarget, value) {
        let isValid;
        if (this.#typeOfSchema[fieldTarget].type === "Date") {
            isValid = this.#_validateDate(value)
        }
        else if (this.#typeOfSchema[fieldTarget].type === "number") {
            isValid = !Number.isNaN(value)
        }
        else {
            isValid = this.#typeOfSchema[fieldTarget].type == typeof value;
        }
        if (!isValid) {
            this.mesageErrors.push(`\n o tipo do valor esperado prar '${fieldTarget}' era '${this.#typeOfSchema[fieldTarget].type}' porem recebeu o tipo '${Number.isNaN(value)? NaN : typeof value}' `)
        }
        return isValid
    }

    #_validadeLengthOfValues(fieldTarget, value) {
        const isValid = String(value).length >= this.#typeOfSchema[fieldTarget].minLength;
        if (!isValid) {
            this.mesageErrors.push(`\n o tamanho minimo de ${fieldTarget} é de ${this.#typeOfSchema[fieldTarget].minLength} digitos`)
        }
        return isValid
    }

    #_validateDate(date) {
        return !isNaN(new Date(date.toString()).getTime()) && RegExp(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/).test(date)
    }

    #_isEmpty(value, field) {
        if (value != null && value != undefined) {
            return true
        }
        this.mesageErrors.push(`\n o valor de ${field} é vazio`)
        return false
    }

}

