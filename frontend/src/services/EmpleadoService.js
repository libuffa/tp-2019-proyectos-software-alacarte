import axios from "axios"
import { ControllerDeEmpleado } from "../controller/ControllerDeEmpleado";

const client = axios.create()

export class EmpleadoService {

  iniciarSesion(data) {
    return client.post('/empleado/iniciarSesion', data, { timeout: 10000 })
      .then(res => { return res.data })
      .catch(error => { console.error({ error }) })
  }

  cerrarSesion(data) {
    return client.post('/empleado/cerrarSesion', data).then(res => { return res.data })
  }

  getEmpleado() {
    return client.get(`/empleado/${ControllerDeEmpleado.getSesionActiva()}`).then(res => { return res.data })
  }

  getEmpleadoPorId(id) {
    return client.get(`/empleado/${id}`).then(res => { return res.data })
  }

  getEmpleadoById(id) {
    return client.get(`/empleado/${id}`).then(res => { return res.data })
  }

  validarUserName(userName) {
    return client.get(`/empleado/${userName}/validar`).then(res => { return res.data })
  }

  validarMail(data) {
    return client.post(`/empleado/mail/validar`, data).then(res => { return res.data })
  }

  getMenuEmpleado() {
    return client.get(`/empleado/${ControllerDeEmpleado.getSesionActiva()}/menu`).then(res => { return res.data })
  }

  getEmpleados() {
    return client.get(`/empleados`).then(res => { return res.data })
  }

  cambiarContraseña(data) {
    return client.put('/empleado/cambiarContraseña', data).then(res => { return res.data })
  }

  recuperarContraseña(data) {
    return client.put('/empleado/recuperarContraseña', data).then(res => { return res.data })
  }

  agregarEmpleado(data) {
    return client.put('/empleado/agregarEmpleado', data).then(res => { return res.data })
  }

  eliminarEmpleado(data) {
    return client.post('/empleado/eliminar', data).then(res => { return res.data })
  }

  enviarMailCrear(data) {
    return client.put('/crear/mail', data, { timeout: 10000 }).then(res => { return res.data })
  }

  enviarMailRecuperar(data) {
    return client.put('/recuperar/mail', data, { timeout: 10000 }).then(res => { return res.data })
  }
}