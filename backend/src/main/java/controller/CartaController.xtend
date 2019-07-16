package controller

import domain.Categoria
import domain.ItemCarta
import java.awt.image.BufferedImage
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
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/carta/obtenerCategorias")
	def Result obtenerCategorias() {
		try {
			return ok(Categoria.values.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/carta/:id/obtenerPlato")
	def Result obteberPlato() {
		var platoSolicitado = carta.searchById(new Long(id))
		try {
			return ok(platoSolicitado.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/:id/cambiarEstadoPlato")
	def Result cambiarEstadoPlato() {
		var platoAModificar = carta.searchById(new Long(id))
		try {
			platoAModificar.cambiarEstado()
			carta.update(platoAModificar)
			return ok("True")
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Put("/carta/crearPlato")
	def Result crearPlato(@Body String body) {
		var nuevoPlato = body.fromJson(ItemCarta)
		try {
			carta.create(nuevoPlato)
			return ok()
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/:id/modificarPlato")
	def Result modificarPlato(@Body String body) {
		var platoModificado = body.fromJson(ItemCarta)
		try {
			carta.update(platoModificado)
			return ok()
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Put("/carta/:id/eliminarPlato")
	def Result eliminarPlato() {
		var platoAEliminar = carta.searchById(new Long(id))
		try {
			carta.delete(platoAEliminar)
			return ok()
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/agregarItemCarta")
	def Result agregarItemCarta(@Body String body) {
		
		val data = body.getPropertyValue("data")

		val idItemCarta = Long.valueOf(body.getPropertyValue("id"))
		val titulo = String.valueOf(body.getPropertyValue("titulo"))
		val descripcion = String.valueOf(body.getPropertyValue("descripcion"))
		val categoria = Categoria.valueOf(body.getPropertyValue("categoria"))
		val subcategoria = String.valueOf(body.getPropertyValue("subcategoria"))
		val precioUnitario = Double.valueOf(body.getPropertyValue("precioUnitario"))
		val imagenes = body.getPropertyValue("imagenes")

		try {
			
			var ItemCarta itemCarta

			if (idItemCarta !== null) {
				itemCarta = new ItemCarta => [
					it.id = idItemCarta
					it.titulo = titulo
					it.descripcion = descripcion
					it.categoria = categoria
					it.subCategoria = subcategoria
					it.precioUnitario = precioUnitario
				]
				carta.update(itemCarta)
			} else {
				itemCarta = new ItemCarta => [
					it.titulo = titulo
					it.descripcion = descripcion
					it.categoria = categoria
					it.subCategoria = subcategoria
					it.precioUnitario = precioUnitario
				]
				carta.create(itemCarta)
			}
			
			if(itemCarta === null) {
				return ok('{ "error" : "hubo un error en el servicio" }')
			}


			return ok("ok")
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

}
