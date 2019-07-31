import axios from "axios"

const client = axios.create()

export class ItemsCartaService {
  getItemsCartaPorCategoria(categoria) {
    return client.get(`/carta/${categoria}`).then(res => { return res.data })
  }

  getCategorias() {
    return client.get(`/carta/obtenerCategorias`).then(res => { return res.data })
  }

  getSubCategorias() {
    return client.get(`/carta/subCategorias`).then(res => { return res.data })
  }

  getItemCarta(idItemCarta) {
    return client.get(`/carta/${idItemCarta}/obtenerPlato`).then(res => { return res.data })
  }

  updateEstadoItem(id) {
    return client.post(`/carta/${id}/cambiarEstadoPlato`).then(res => { return res.data })
  }

  amItemCarta(data) {
    return client.put(`/carta/amItemCarta`, data).then(res => { return res.data })
  }

  bajaItemCarta(id) {
    return client.post(`/carta/${id}/eliminarPlato`).then(res => { return res.data })
  }

  cambiarPremio(id) {
    return client.post(`/carta/${id}/cambiarPremio`).then(res => { return res.data })
  }

  getPremio() {
    return client.get(`/carta/premio`).then(res => { return res.data })
  }
}
