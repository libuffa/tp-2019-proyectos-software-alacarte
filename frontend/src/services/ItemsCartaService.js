import axios from "axios"

const client = axios.create()

export class ItemsCartaService {
  getItemsCartaPorCategoria(categoria){
    return client.get(`/carta/${categoria}`).then(res => {return res.data})
  }
}
