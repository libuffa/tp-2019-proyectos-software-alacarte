import axios from "axios"

const client = axios.create()

export class EmpleadoService {

  getEmpleado(id) {
    return client.get(`/empleado/` + id).then(res => { return res.data })
  }

  getMenuEmpleado(id) {
    return client.get(`/empleado/menu/` + id).then(res => { return res.data })
  }
}