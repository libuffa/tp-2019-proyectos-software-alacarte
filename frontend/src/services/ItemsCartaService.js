import axios from "axios"

const client = axios.create()

export class ItemsCartaService {
  getItemsCartaPorCategoria(categoria) {
    return client.get(`/carta/${categoria}`).then(res => { return res.data })
  }

  getCategorias() {
    return client.get(`/carta/obtenerCategorias`).then(res => { return res.data })
  }

  updateEstadoItem(id) {
    return client.post(`/carta/${id}/cambiarEstadoPlato`).then(res => { return res.data })
  }
}
