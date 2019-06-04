package controller

import domain.Categoria
import domain.ItemCarta
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.api.annotation.Put
import org.uqbar.xtrest.json.JSONUtils
import repository.ItemCartaRepository

@Controller
@Accessors
class CartaController {

	extension JSONUtils = new JSONUtils
	ItemCartaRepository carta = ItemCartaRepository.instance

	@Get("/carta/:categoria")
	def Result obtenerCarta() {
		try {
			val _categoria = Categoria.valueOf(categoria)
			val items = carta.searchByCategoria(_categoria)
			return ok(items.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/carta/obtenerCategorias")
	def Result obtenerCategorias() {
		try {
			return ok(Categoria.values.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/carta/:id/obtenerPlato")
	def Result obteberItem() {
		var platoSolicitado = carta.searchById(new Long(id))
		try {
			return ok(platoSolicitado.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/:id/cambiarEstadoPlato")
	def Result cambiarEstadoPlato() {
		var platoAModificar = carta.searchById(new Long(id))
		try {
			platoAModificar.cambiarEstado()
			carta.update(platoAModificar)
			return ok()
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Put("/carta/crearPlato")
	def Result nuevoPlato(@Body String body) {
		var nuevoPlato = body.fromJson(ItemCarta)
		try {
			carta.create(nuevoPlato)
			return ok()
		} catch(Exception e) {
			badRequest(e.message)
		} 
	}
	
	@Post("/carta/:id/modificarPlato")
	def Result actualizarPlato(@Body String body) {
		var platoModificado = body.fromJson(ItemCarta)
		try {
			carta.update(platoModificado)
			return ok()
		} catch(Exception e) {
			badRequest(e.message)
		} 
	}
	
	@Put("/carta/:id/eliminarPlato")
	def Result eliminarPlato() {
		var platoAEliminar = carta.searchById(new Long(id))
		try {
			carta.delete(platoAEliminar)
			return ok()
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
}
