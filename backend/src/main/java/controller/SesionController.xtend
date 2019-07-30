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
import domain.Sesion
import domain.ItemCarta
import domain.Categoria
import repository.EmpleadoRepository
import domain.Pedido

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
			var Sesion sesion
			try {
				sesion = repositorioSesion.searchById(id)
			} catch(Exception ex) {
				return ok(' { "error" : "Sesión incorrecta" } ')
			}
			if(sesion.fechaBaja === null) {
				return ok("Sesión correcta")
			} else {
				return ok(' { "error" : "La sesión expiró" } ')
			}
		}catch(Exception e) {
			return ok(' { "error" : "Error en el servidor" } ')
		}
	}
	
	@Put("/pedido/generarPedido")
	def Result generarPedido(@Body String body) {
		var idSesion = Long.valueOf(body.getPropertyValue("idSesion"))
		var idItem = Long.valueOf(body.getPropertyValue("idItem"))
		var comentario = body.getPropertyValue("comentario")
		var cantidad = Integer.valueOf(body.getPropertyValue("cantidad"))
		
		try{
			var Sesion sesion
			var ItemCarta itemCarta
			try {
				sesion = repositorioSesion.searchById(idSesion)
			} catch(Exception ex) {
				return ok(' { "error" : "La sesión expiro" } ')
			}
			if (sesion.fechaBaja !== null) {
				return ok(' { "error" : "La sesión expiro" } ')
			}
			if (sesion.pideCuenta) {
				return ok(' { "error" : "Cancelar pedido de cuenta" } ')
			}
			try {
				itemCarta = carta.searchById(idItem)
			} catch(Exception exc) {
				return ok(' { "error" : "El plato no se encuentra disponible" } ')
			}
			if(!itemCarta.habilitado){
				return ok(' { "error" : "El plato no se encuentra disponible" } ')
			}
			sesion.pedirItem(itemCarta, cantidad, comentario, false)
			if(itemCarta.categoria.equals(Categoria.Bebida)) {
				try {
					EmpleadoRepository.instance.searchById(sesion.idMozo).cambiarEstadoNotificaciones()
				} catch(Exception excep) {
					return ok("El plato se agrego correctamente")
				}
			}
			return ok("El plato se agrego correctamente")
		}catch(Exception e) {
			return ok(' { "error" : "Error en el servidor" } ')
		}
	}
	
	@Put("/pedido/premio")
	def Result reclamarPremio(@Body String body) {
		var idSesion = Long.valueOf(body.getPropertyValue("idSesion"))
		var idItem = Long.valueOf(body.getPropertyValue("idItem"))
		var comentario = body.getPropertyValue("comentario")
		
		try{
			var Sesion sesion
			var ItemCarta itemCarta
			try {
				sesion = repositorioSesion.searchById(idSesion)
			} catch(Exception ex) {
				return ok(' { "error" : "La sesión expiro" } ')
			}
			if (sesion.fechaBaja !== null) {
				return ok(' { "error" : "La sesión expiro" } ')
			}
			if (sesion.pideCuenta) {
				return ok(' { "error" : "Cancelar pedido de cuenta" } ')
			}
			try {
				itemCarta = carta.searchById(idItem)
			} catch(Exception exc) {
				return ok(' { "error" : "El plato no se encuentra disponible" } ')
			}
			if(!itemCarta.habilitado){
				return ok(' { "error" : "El plato no se encuentra disponible" } ')
			}
			if(sesion.pedidosActivos.size() <= 0) {
				return ok(' { "error" : "Debe tener un pedido activo" } ')
			}
			if(!sesion.ganoPremio) {
				return ok(' { "error" : "El premio ya fue reclamado" } ')
			}
			sesion.pedirItem(itemCarta, 1, comentario, true)
			if(itemCarta.categoria.equals(Categoria.Bebida)) {
				try {
					EmpleadoRepository.instance.searchById(sesion.idMozo).cambiarEstadoNotificaciones()
				} catch(Exception excep) {
					return ok("Premio agregado correctamente")
				}
			}
			return ok("Premio agregado correctamente")
		}catch(Exception e) {
			return ok(' { "error" : "Error en el servidor" } ')
		}
	}
	
	@Post("/sesion/:id/jugar")
	def Result jugar() {
		try{
			val _id = Long.valueOf(id)
			val sesion = repositorioSesion.searchById(_id)
			if(sesion.fechaBaja === null) {
				sesion.jugar()
				return ok("True")
			} else {
				return ok(' { "error" : "Sesion cerrada" } ')
			}
		}catch(Exception e) {
			return ok(' { "error" : "La sesion no existe" } ')
		}
	}
	
	@Post("/sesion/:id/jugar/ganar")
	def Result ganar() {
		try{
			val _id = Long.valueOf(id)
			val sesion = repositorioSesion.searchById(_id)
			if(sesion.fechaBaja === null) {
				sesion.ganarPremio()
				return ok("True")
			} else {
				return ok(' { "error" : "Sesion cerrada" } ')
			}
		}catch(Exception e) {
			return ok(' { "error" : "La sesion no existe" } ')
		}
	}
	
	@Post("/pedido/actualizarPedido")
	def Result actualizarPedido(@Body String body) {
		var idSesion = Long.valueOf(body.getPropertyValue("idSesion"))
		var idPedido = Long.valueOf(body.getPropertyValue("idPedido"))
		var comentario = body.getPropertyValue("comentario")
		var cantidad = Integer.valueOf(body.getPropertyValue("cantidad"))
		
		try{
			var Sesion sesion
			var Pedido pedido
			try {
				sesion = repositorioSesion.searchById(idSesion)
			} catch(Exception ex) {
				return ok(' { "error" : "Sesión no encontrada" } ')
			}
			if (sesion.fechaBaja !== null) {
				return ok(' { "error" : "La sesión expiro" } ')
			}
			if (sesion.pideCuenta) {
				return ok(' { "error" : "Cancelar pedido de cuenta" } ')
			}
			pedido = sesion.getPedido(idPedido)
			if(!pedido.estado.equals(Estado.Creado)){
				return ok(' { "error" : "Pedido en curso" } ')
			}
			pedido.cantidad = cantidad
			pedido.comentarios = comentario
			repositorioSesion.update(sesion)
			if (pedido.itemCarta.categoria.equals(Categoria.Bebida)) {
				try {
					EmpleadoRepository.instance.searchById(sesion.idMozo).cambiarEstadoNotificaciones()
				} catch(Exception excep) {
					return ok("Pedido modificado")
				}
			}
			return ok("Pedido modificado")
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}

	@Get("/sesion/:id")
	def Result sesion() {
		try {
			val _id = Long.valueOf(id)
			var Sesion sesion
			try {
				sesion = repositorioSesion.searchById(_id)
			} catch(Exception e) {
				return ok('{ "error" : "La sesión no existe" }')
			}
			if(sesion.fechaBaja !== null) {
				return ok('{ "error" : "La sesión expiró" }')
			}
			return ok(sesion.toJson)
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
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
				return ok('{ "error" : "Pedido no encontrado" }')
			}
			val sesion = repositorioSesion.searchSesionByPedido(idPedido)
			if(sesion.fechaBaja === null && !sesion.pideCuenta) {
				if(!sesion.sesionActiva) {
					return ok('{ "error" : "Sesión inactiva" }')
				}
				if(sesion.getPedido(idPedido).cancelado) {
					return ok('{"error" : "Pedido no encontrado"}')
				} else {
					try{
						sesion.bajaPedido(idPedido)
						return ok("Pedido cancelado")
					} catch(Exception e){
						return ok('{"error" : "Error al eliminar pedido"}')
					}
				}
			} else {
				return ok('{"error" : "Sesión inactiva"}')
			}
		} catch (Exception e) {
			return ok('{"error" : "Error en el servidor"}')
		}
	}
	
	@Put("/pedido/cuenta/:id")
	def Result pedirCuenta() {
		try {
			val idSesion = Long.valueOf(id)
			var Sesion sesion
			try {
				sesion = repositorioSesion.searchById(idSesion)
			} catch(Exception ex) {
				return ok('{ "error" : "La sesión no existe" }')
			}
			if(sesion.fechaBaja !== null) {
				return ok('{"error" : "Sesión inactiva"}')
			}
			sesion.pedirCuenta()
			if (sesion.pideCuenta) {
				return ok("Se pidió la cuenta")
			} else {
				return ok("Se canceló la cuenta")
			}
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
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