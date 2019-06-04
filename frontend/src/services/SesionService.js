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
}