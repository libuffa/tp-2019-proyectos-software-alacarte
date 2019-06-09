package controller

import domain.Estado
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.json.JSONUtils
import repository.SesionRepository

@Controller
@Accessors
class SesionController {
	
	extension JSONUtils = new JSONUtils
	SesionRepository repositorioSesion = SesionRepository.instance

	@Get("/sesion/:id")
	def Result sesion() {
		try {
			val _id = Long.valueOf(id)
			val sesion = repositorioSesion.searchById(_id)
			return ok(sesion.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/sesion")
	def Result sesiones() {
		try {
			val sesiones = repositorioSesion.allInstances
			return ok(sesiones.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido/:id")
	def Result pedido() {
		try {
			val _id = Long.valueOf(id)
			val sesion = repositorioSesion.searchSesionByPedido(_id)
			val pedido = sesion.pedidos.findFirst[pedido|pedido.id.equals(_id)]
			return ok(pedido.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido")
	def Result pedidos() {
		try {
			val sesiones = repositorioSesion.allInstances
			val pedidos = sesiones.map[pedidos].get(0)
			return ok(pedidos.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/pedido/cocina")
	def Result pedidosCocina() {
		try {
			val sesiones = repositorioSesion.allInstances
			val pedidos = sesiones.map[pedidos].get(0)
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
	
	@Post("/pedido/:id/cambiarEstado")
	def Result cambiarEstado() {
		try {
			val idPedido = new Long(id)
			repositorioSesion.searchSesionByPedido(idPedido).cambiarEstado(idPedido)
			return ok('{"status" : "True"}')
		} catch (Exception e) {
			return badRequest(e.message)
		}
	}
}