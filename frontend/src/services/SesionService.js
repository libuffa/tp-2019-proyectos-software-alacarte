import axios from "axios"

const client = axios.create()

export class SesionService {

  getSesiones() {
    return client.get(`/sesion`).then(res => { return res.data })
  }

  getSesion(id) {
    return client.get(`/sesion/` + id).then(res => { return res.data })
  }

  getPedidos() {
    return client.get(`/pedido`).then(res => { return res.data })
  }

  getPedido(id) {
    return client.get(`/pedido/${id}`).then(res => { return res.data })
  }

  getPedidosCocina() {
    return client.get(`/pedido/cocina`).then(res => { return res.data })
  }

  getEstados() {
    return client.get(`/estado`).then(res => { return res.data })
  }

  bajaPedido(data) {
    return client.put('/pedido/baja', data)
  }

  pedirCuenta(id) {
    return client.put('/pedido/cuenta/' + id)
  }

  cambiarEstadoPedido(id) {
    return client.post(`/pedido/${id}/cambiarEstado`).then(res => { return res.data })
  }
}