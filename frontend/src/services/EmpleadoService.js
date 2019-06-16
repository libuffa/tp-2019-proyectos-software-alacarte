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

    getMenuEmpleado() {
        return client.get(`/empleado/${ControllerDeEmpleado.getSesionActiva()}/menu`).then(res => { return res.data })
    }
}