import axios from "axios"

const client = axios.create()

export class SesionService {
  getPedidos() {
    return client.get(`/pedido`).then(res => { return res.data })
  }
}