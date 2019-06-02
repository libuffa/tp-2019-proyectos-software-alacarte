export class Pedido {

    static fromJson(pedidoJSON) {
        return Object.assign(new Pedido(), pedidoJSON);
    }

    toJSON() {
        const result = Object.assign({}, this)
        return result
    }

}