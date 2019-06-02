package controller

import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.json.JSONUtils
import repository.SesionRepository

@Controller
@Accessors
class SesionController {
	
	extension JSONUtils = new JSONUtils
	SesionRepository repoSesion = SesionRepository.instance

	@Get("/sesion/:id")
	def Result sesion() {
		try {
			val _id = Integer.valueOf(id)
			val sesion = repoSesion.searchById(_id)
			return ok(sesion.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/sesion")
	def Result sesiones() {
		try {
			val sesiones = repoSesion.allInstances
			return ok(sesiones.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido/:id")
	def Result pedido() {
		try {
			val _id = Integer.valueOf(id)
			val sesion = repoSesion.searchById(_id)
			val pedidos = sesion.pedidos
			return ok(pedidos.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido")
	def Result pedidos() {
		try {
			val sesiones = repoSesion.allInstances
			val pedidos = sesiones.map[pedidos]
			return ok(pedidos.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
}