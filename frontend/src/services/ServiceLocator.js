import { ItemsCartaService } from "./ItemsCartaService.js";
import MesaServiceMock from './mocks/MesaServiceMock';
import { SesionService } from "./SesionService.js";

export const ServiceLocator = {
    ItemsCartaService: new ItemsCartaService(),
    mesaService: new MesaServiceMock(),
    SesionService: new SesionService()
}