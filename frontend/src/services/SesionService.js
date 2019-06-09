import axios from "axios"

const client = axios.create()

export class SesionService {
  getPedidos() {
    return client.get(`/pedido`).then(res => { return res.data })
  }

  getPedidosCocina() {
    return client.get(`/pedido/cocina`).then(res => { return res.data })
  }

  getPedido(id) {
    return client.get(`/pedido/${id}`).then(res => { return res.data })
  }

  getEstados() {
    return client.get(`/estado`).then(res => { return res.data })
  }

  cambiarEstadoPedido(id) {
    return client.post(`/pedido/${id}/cambiarEstado`).then(res => { return res.data })
  }
}