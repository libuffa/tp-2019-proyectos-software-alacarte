import { ItemsCartaService } from "./ItemsCartaService.js";
import { EmpleadoService } from "./EmpleadoService.js";
import { SesionService } from "./SesionService.js";
import MesaService from "./MesaService.js";

export const ServiceLocator = {
  ItemsCartaService: new ItemsCartaService(),
  mesaService: new MesaService(),
  SesionService: new SesionService(),
  EmpleadoService: new EmpleadoService(),
}