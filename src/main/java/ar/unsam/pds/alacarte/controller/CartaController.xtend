package ar.unsam.pds.alacarte.controller

import ar.unsam.pds.alacarte.domain.carta.Categoria
import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import ar.unsam.pds.alacarte.repository.Carta
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.api.annotation.Put
import org.uqbar.xtrest.json.JSONUtils

@Controller
@Accessors
class CartaController {

	extension JSONUtils = new JSONUtils
	Carta carta = Carta.instance

	@Get("/carta/:categoria")
	def Result usuario() {
		try {
			val _categoria = Categoria.valueOf(categoria)
			val items = carta.searchByCategoria(_categoria)
			return ok(items.toJson)
		} catch(Exception e) {
			badRequest(e.message)
		}
	}

	@Put("/carta")
	def Result nuevoPlato(@Body String body) {
		var nuevoPlato = body.fromJson(ItemCarta)
		try {
			carta.create(nuevoPlato)
			return ok("El plato se añadió correctamente")
		} catch(Exception e) {
			badRequest(e.message)
		} 
	}
	
	@Post("/carta")
	def Result actualizarPlato(@Body String body) {
		var platoModificado = body.fromJson(ItemCarta)
		try {
			carta.update(platoModificado)
			return ok("El plato se modificó correctamente")
		} catch(Exception e) {
			badRequest(e.message)
		} 
	}
	
	@Put("/carta/:id/eliminar")
	def Result eliminarPlato() {
		var platoAEliminar = carta.searchById(new Long(id))
		try {
			carta.delete(platoAEliminar)
			return ok("El plato se eliminó correctamente")
		} catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Post("/carta/:id/cambiarEstado")
	def Result cambiarEstadoPlato() {
		var platoAModificar = carta.searchById(new Long(id))
		try {
			platoAModificar.cambiarEstado()
			carta.update(platoAModificar)
			return ok("Se cambió el estado del plato correctamente")
		} catch(Exception e) {
			badRequest(e.message)
		}
	}

}
