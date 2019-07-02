package controller

import domain.Estado
import java.util.ArrayList
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.api.annotation.Put
import org.uqbar.xtrest.json.JSONUtils
import repository.ItemCartaRepository
import repository.SesionRepository

@Controller
@Accessors
class SesionController {
	
	extension JSONUtils = new JSONUtils
	SesionRepository repositorioSesion = SesionRepository.instance
	ItemCartaRepository carta = ItemCartaRepository.instance

	@Post("/sesion/iniciarSesion")
	def Result iniciarSesion(@Body String body) {
		var id = Long.valueOf(body.getPropertyValue("idSesion"))
		try{
			val sesion = repositorioSesion.searchById(id)
			if(sesion.fechaBaja === null) {
				return ok("True")
			} else {
				return ok("Sesion Cerrada")
			}
		}catch(Exception e) {
			badRequest("La sesion no existe o esta inactiva")
		}
	}
	
	@Put("/pedido/generarPedido")
	def Result generarPedido(@Body String body) {
		var idSesion = Long.valueOf(body.getPropertyValue("idSesion"))
		var idItem = Long.valueOf(body.getPropertyValue("idItem"))
		var comentario = body.getPropertyValue("comentario")
		var cantidad = Integer.valueOf(body.getPropertyValue("cantidad"))
		
		try{
			val sesion = repositorioSesion.searchById(idSesion)
			if(sesion.fechaBaja === null && !sesion.pideCuenta){
				val itemCarta = carta.searchById(idItem)
				if(itemCarta.habilitado){
					sesion.pedirItem(itemCarta, cantidad, comentario)
					return ok("True")
				}
				return ok("El plato que desea no se encuentra disponible")
			} else {
				return ok("La sesion expiro")
			}
		}catch(Exception e) {
			badRequest("La sesion no existe o esta inactiva")
		}
	}
	
	@Post("/pedido/actualizarPedido")
	def Result actualizarPedido(@Body String body) {
		var idSesion = Long.valueOf(body.getPropertyValue("idSesion"))
		var idPedido = Long.valueOf(body.getPropertyValue("idPedido"))
		var comentario = body.getPropertyValue("comentario")
		var cantidad = Integer.valueOf(body.getPropertyValue("cantidad"))
		
		try{
			val sesion = repositorioSesion.searchById(idSesion)
			if(sesion.fechaBaja === null && !sesion.pideCuenta) {
				var pedido = sesion.getPedido(idPedido)
				if(pedido.estado.equals(Estado.Creado)){
					pedido.cantidad = cantidad
					pedido.comentarios = comentario
					repositorioSesion.update(sesion)
					return ok("True")
				}
				return ok("No fue posible modificar el plato")
			} else {
				return ok("La sesion expiro")
			}
		}catch(Exception e) {
			badRequest("La sesion no existe o esta inactiva")
		}
	}

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
//			val sesionesActivas = sesiones.filter[sesion | sesion.sesionActiva ].toList
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
			val sesiones = repositorioSesion.allInstances
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
			val sesiones = repositorioSesion.allInstances
			val sesionesActivas = sesiones.filter[sesion | sesion.sesionActiva ].toList
			val pedidos = sesionesActivas.map[pedidosActivos].toList
			val todosLosPedidos = new ArrayList
			pedidos.forEach[listaPedidos | listaPedidos.forEach[pedido | todosLosPedidos.add(pedido)]]
			val pedidosCocina = todosLosPedidos.filter[ pedido | !pedido.estado.equals(Estado.Finalizado) && !pedido.estado.equals(Estado.Entregado) && pedido.itemCarta.noEsBebida ].toList
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
	
	@Put("/pedido/baja")
	def Result bajaPedido(@Body String body) {
		try {
			val idPedido = Long.valueOf(body.getPropertyValue("id"))
			if (idPedido === null) {
				return badRequest('{ "error" : "pedido inexistente" }')
			}
			val sesion = repositorioSesion.searchSesionByPedido(idPedido)
			if(sesion.fechaBaja === null && !sesion.pideCuenta) {
				if(!sesion.sesionActiva) {
					return badRequest('{ "error" : "pedido pertenece a una sesion no activa" }')
				}
				sesion.bajaPedido(idPedido)
				return ok('{"status" : "OK"}')
			} else {
				return ok('{"error" : "Sesion Inactiva"}')
			}
		} catch (Exception e) {
			return badRequest(e.message)
		}
	}
	
	@Put("/pedido/cuenta/:id")
	def Result pedirCuenta() {
		try {
			val _id = Long.valueOf(id) 
			val sesion =repositorioSesion.searchById(_id)
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