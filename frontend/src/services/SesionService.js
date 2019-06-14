import { ControllerDeSesion } from '../controller/ControllerDeSesion.js'
import axios from "axios"

const client = axios.create()

export class SesionService {

  getSesiones() {
    return client.get(`/sesion`).then(res => { return res.data })
  }

  getSesionActiva() {
    return client.get(`/sesion/${ControllerDeSesion.getSesionActiva()}`).then(res => { return res.data })
  }

  getSesion(id) {
    return client.get(`/sesion/${id}`).then(res => { return res.data })
  }

  getPedidos() {
    return client.get(`/pedido`).then(res => { return res.data })
  }

  getPedido() {
    return client.get(`/pedido/${ControllerDeSesion.getSesionActiva()}`).then(res => { return res.data })
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
    return client.put(`/pedido/cuenta/${id}`)
  }

  cambiarEstadoPedido(id) {
    return client.post(`/pedido/${id}/cambiarEstado`).then(res => { return res.data })
  }

  generarPedido(data) {
    return client.put(`/pedido/generarPedido`, data).then(res => { return res.data })
  }

  actualizarPedido(data) {
    return client.post(`/pedido/actualizarPedido`, data).then(res => { return res.data })
  }

  iniciarSesion(data) {
    return client.post('/sesion/iniciarSesion', data, { timeout: 10000 })
      .then(res => { return res.data })
      .catch(error => { console.error({ error }) })
  }

  cerrarSesion(data) {
    return client.post('/sesion/cerrarSesion', data).then(res => { return res.data })
  }
}