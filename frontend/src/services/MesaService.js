import axios from "axios"

const client = axios.create()

export default class MesaService {
  getMesas() {
    return client.get(`/mesas`).then(res => { return res.data })
  }
}