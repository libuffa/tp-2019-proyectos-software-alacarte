import MesaService from './../MesaService';

let mesasMock = [
  { id: 1, estado: "Ocupada" },
  { id: 2, estado: "Disponible" },
  { id: 3, estado: "Disponible" },
];

export default class MesaServiceMock extends MesaService {
  async getMesas() {
    return Promise.resolve(mesasMock);
  }
}
