import axios from "axios"
import FormData from 'form-data'

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

  agregarItemCarta(data) {
    console.log(data)
    let formData = new FormData()
    const imagenes = data.imagenes
    console.log(imagenes)
    imagenes.forEach( (imagen) => formData.append('imagen', imagen, imagen.name) )
    // formData.append('data', data)
    console.log(formData)
    const imagen = imagenes[0]
    return client.post(`/carta/agregarItemCarta`, imagen,{
      headers: {
        // 'accept': 'application/json',
        // 'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': imagen.type,
      }}).then(res => { return res.data })
  }

  eliminarItemCarta(data) {
    return client.post(`/carta/eliminarItemCarta`, data).then(res => { return res.data })
  }

}
