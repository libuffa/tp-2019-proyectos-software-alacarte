import { ItemsCartaService } from "./ItemsCartaService.js";
import { SesionService } from "./SesionService.js";

export const ServiceLocator = {
  ItemsCartaService: new ItemsCartaService(),
  SesionService: new SesionService()
}