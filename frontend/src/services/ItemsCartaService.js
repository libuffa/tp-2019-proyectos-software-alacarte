import axios from "axios"

const client = axios.create()

export class ItemsCartaService {
  getItemsCartaPorCategoria(categoria) {
    return client.get(`/carta/${categoria}`).then(res => { return res.data })
  }

  getCategorias() {
    return client.get(`/carta/obtenerCategorias`).then(res => { return res.data })
  }

  getItemCarta(idItemCarta) {
    return client.get(`/carta/${idItemCarta}/obtenerPlato`).then(res => { return res.data })
  }

  updateEstadoItem(id) {
    return client.post(`/carta/${id}/cambiarEstadoPlato`).then(res => { return res.data })
  }

  crearItem(dataSend) {
    let formData = new FormData()
    let imagefile = document.querySelector(dataSend)
    formData.append('data', imagefile)

    // let data = {
    //   title: this.title,
    //   tagline: this.tagline,
    //   slug: this.slug,
    //   body: this.body
    // }

    return client.post(`/carta/crear`, formData).then(res => { return res.data }).catch(() => { console.log("Fallo el cargado de imagenes") })
  }
}
