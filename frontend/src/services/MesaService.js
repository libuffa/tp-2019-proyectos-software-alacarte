import axios from "axios"

const client = axios.create()

export default class MesaService {
  getMesas() {
    return client.get(`/mesas`).then(res => { return res.data })
  }

  getMesa(id) {
    return client.get(`/mesas/${id}`).then(res => { return res.data })
  }

  cambiarEstado(data) {
    return client.post(`/mesas/estado`, data).then(res => { return res.data })
  }
}