import axios from "axios"
import { API_URL } from "./Config";

const client = axios.create({
    baseURL: API_URL
});

export class SesionService {
    
    getPedidos() {
        return client.get(`/pedido`).then(res => { return res.data })
    }

    getPedidosCocina() {
        return client.get(`/pedido/cocina`).then(res => { return res.data })
    }

    getPedido(id) {
        return client.get(`/pedido/` + id).then(res => { return res.data })
    }

    getEstados() {
        return client.get(`/estado`).then(res => { return res.data })
    }

    cambiarEstadoPedido(data) {
        return client.put('/pedido/cocina', data)
    }

}