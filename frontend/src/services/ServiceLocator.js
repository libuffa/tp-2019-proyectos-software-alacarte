import { ItemsCartaService } from "./ItemsCartaService.js";
import MesaServiceMock from './mocks/MesaServiceMock';
import { SesionService } from "./SesionService.js";
import { EmpleadoService } from "./EmpleadoService.js";

export const ServiceLocator = {
    ItemsCartaService: new ItemsCartaService(),
    mesaService: new MesaServiceMock(),
    SesionService: new SesionService(),
    EmpleadoService: new EmpleadoService(),
}