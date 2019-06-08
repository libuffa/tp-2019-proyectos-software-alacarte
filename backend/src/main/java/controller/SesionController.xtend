package controller

import domain.Estado
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Put
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
			val _id = Long.valueOf(id)
			val sesion = repoSesion.searchById(_id)
			
//			if(!sesion.sesionActiva) {
//				return badRequest('{ "error" : "sesion no activa" }')
//			}
			
			return ok(sesion.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/sesion")
	def Result sesiones() {
		try {
			val sesiones = repoSesion.allInstances
//			val sesionesActivas = sesiones.filter[sesion | sesion.sesionActiva ].toList
			return ok(sesiones.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido/:id")
	def Result pedido() {
		try {
			val _id = Long.valueOf(id)
			val sesion = repoSesion.searchSesionByPedido(_id)
			
			if(!sesion.sesionActiva) {
				return badRequest('{ "error" : "ya pediste la cuenta" }')
			}
			
			val pedido = sesion.pedidosActivos.findFirst[pedido|pedido.id.equals(_id)]
			return ok(pedido.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido")
	def Result pedidos() {
		try {
			val sesiones = repoSesion.allInstances
			val sesionesActivas = sesiones.filter[sesion | sesion.sesionActiva ].toList
			val pedidos = sesionesActivas.map[pedidosActivos].get(0)
			return ok(pedidos.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido/cocina")
	def Result pedidosCocina() {
		try {
			val sesiones = repoSesion.allInstances
			val sesionesActivas = sesiones.filter[sesion | sesion.sesionActiva ].toList
			val pedidos = sesionesActivas.map[pedidosActivos].get(0)
			val pedidosCocina = pedidos.filter[ pedido | !pedido.estado.equals(Estado.Finalizado) && pedido.itemCarta.noEsBebida ].toList
			return ok(pedidosCocina.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/estado")
	def Result estados() {
		try {
			return ok(Estado.values.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Put("/pedido/cocina")
	def Result siguienteEstado(@Body String body) {
		try {
			
			val idPedido = Long.valueOf(body.getPropertyValue("id"))

			if (idPedido === null) {
				return badRequest('{ "error" : "pedido inexistente" }')
			}

			val sesion = repoSesion.searchSesionByPedido(idPedido)
			sesion.cambiarEstado(idPedido)

			ok('{"status" : "OK"}')
		} catch (Exception e) {
			badRequest(e.message)
		}
	}
	
	@Put("/pedido/baja")
	def Result bajaPedido(@Body String body) {
		try {
			
			val idPedido = Long.valueOf(body.getPropertyValue("id"))

			if (idPedido === null) {
				return badRequest('{ "error" : "pedido inexistente" }')
			}

			val sesion = repoSesion.searchSesionByPedido(idPedido)
			
			if(!sesion.sesionActiva) {
				return badRequest('{ "error" : "pedido pertenece a una sesion no activa" }')
			}
			
			sesion.bajaPedido(idPedido)

			ok('{"status" : "OK"}')
		} catch (Exception e) {
			badRequest(e.message)
		}
	}
	
	@Put("/pedido/cuenta/:id")
	def Result pedirCuenta() {
		try {
			
			val _id = Long.valueOf(id) 
			val sesion =repoSesion.searchById(_id)

			if (sesion === null) {
				return badRequest('{ "error" : "sesion inexistente" }')
			}
			
			if(!sesion.sesionActiva) {
				return badRequest('{ "error" : "sesion no activa" }')
			}
			
			sesion.pedirCuenta()

			ok('{"status" : "OK"}')
		} catch (Exception e) {
			badRequest(e.message)
		}
	}
	
}