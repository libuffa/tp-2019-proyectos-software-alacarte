export class Sesion {

    static fromJson(sesionJSON) {
        return Object.assign(new Sesion(), sesionJSON);
    }

    toJSON() {
        const result = Object.assign({}, this)
        return result
    }

}