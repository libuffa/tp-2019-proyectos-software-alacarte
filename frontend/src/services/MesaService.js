import { axios } from 'axios';
import { baseUrl } from "./_config";

export default class MesaService {
  async getMesas() {
    try {
      let resp = await axios.get(`${baseUrl}/mesas`);
      return resp.data;
    }
    catch (exception) {
      alert(exception.message);
    }
  }
}