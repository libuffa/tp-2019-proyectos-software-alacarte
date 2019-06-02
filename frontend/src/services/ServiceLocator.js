import { ItemsCartaService } from "./ItemsCartaService.js";
import MesaServiceMock from './mocks/MesaServiceMock';

export const ServiceLocator = {
    ItemsCartaService: new ItemsCartaService(),
    mesaService: new MesaServiceMock()
}