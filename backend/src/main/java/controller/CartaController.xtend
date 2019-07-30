package controller

import domain.Categoria
import domain.ItemCarta
import java.util.ArrayList
import java.util.HashSet
import java.util.List
import java.util.Set
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
			var List<ItemCarta> items = new ArrayList()
			try {
				items = carta.searchByCategoria(_categoria).filter(item | !item.baja).toList
			} catch(Exception ex) {
				return ok('{ "error" : "Imposible cargar categoría" }')
			}
			return ok(items.toJson)
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Get("/carta/obtenerCategorias")
	def Result obtenerCategorias() {
		try {
			return ok(Categoria.values.toJson)
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Get("/carta/subCategorias")
	def Result obtenerSubCategorias() {
		try {
			var List<ItemCarta> items = new ArrayList()
			try {
				items = carta.allInstances().toList
			} catch(Exception ex) {
				return ok('{ "error" : "Error en el servidor" }')
			}
			var List<String> subCategoriasCrudas = items.map(item | item.subCategoria)
			val Set<String> subCategorias = new HashSet()
			subCategoriasCrudas.forEach(categoria | subCategorias.add(categoria))
			return ok(subCategorias.toList.toJson)
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Get("/carta/:id/obtenerPlato")
	def Result obteberPlato() {
		try {
			var ItemCarta itemCarta
			try {
				itemCarta = carta.searchById(new Long(id))
			} catch(Exception ex) {
				return ok('{ "error" : "Plato no encontrado" }')
			}
			if (itemCarta.baja) {
				return ok('{ "error" : "Plato no encontrado" }')
			}
			return ok(itemCarta.toJson)
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}

	@Post("/carta/:id/cambiarEstadoPlato")
	def Result cambiarEstadoPlato() {
		try {
			var ItemCarta itemCarta
			try {
				itemCarta = carta.searchById(new Long(id))
			} catch(Exception ex) {
				return ok('{ "error" : "Plato no encontrado" }')
			}
			try {
				itemCarta.cambiarEstado()
			} catch(Exception exs) {
				return ok('{ "error" : "Plato no encontrado" }')
			}
			if(itemCarta.habilitado){
				return ok("Plato habilitado correctamente")
			} else {
				return ok("Plato deshabilitado correctamente")
			}
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Put("/carta/amItemCarta")
	def Result crearPlato(@Body String body) {
		val idItemCarta = Long.valueOf(body.getPropertyValue("id"))
		val tituloE = String.valueOf(body.getPropertyValue("titulo"))
		val descripcionE = String.valueOf(body.getPropertyValue("descripcion"))
		val categoriaE = String.valueOf(body.getPropertyValue("categoria"))
		val subCategoriaE = String.valueOf(body.getPropertyValue("subCategoria"))
		val precioUnitarioE = Double.valueOf(body.getPropertyValue("precioUnitario"))
		val List<String> imagenesE = new ArrayList()
		val imagen1 = String.valueOf(body.getPropertyValue("imagen1"))
		val imagen2 = String.valueOf(body.getPropertyValue("imagen2"))
		val imagen3 = String.valueOf(body.getPropertyValue("imagen3"))
		val imagen4 = String.valueOf(body.getPropertyValue("imagen4"))
		val imagen5 = String.valueOf(body.getPropertyValue("imagen5"))
	
		if (imagen1 !== "") {
			imagenesE.add(imagen1)
		}	
		if (imagen2 !== "") {
			imagenesE.add(imagen2)
		}
		if (imagen3 !== "") {
			imagenesE.add(imagen3)
		}
		if (imagen4 !== "") {
			imagenesE.add(imagen4)
		}
		if (imagen5 !== "") {
			imagenesE.add(imagen5)
		}
		try {
			var ItemCarta itemCarta
			try {
				itemCarta = carta.searchById(new Long(idItemCarta))
			} catch (Exception e) {
				itemCarta = new ItemCarta
			}
			if (itemCarta.baja) {
				return ok('{ "error" : "Plato no encontrado" }')
			}
			itemCarta.titulo = tituloE
			itemCarta.descripcion = descripcionE
			itemCarta.categoria = Categoria.valueOf(categoriaE)
			itemCarta.subCategoria = subCategoriaE
			itemCarta.precioUnitario = precioUnitarioE
			itemCarta.imagenes = imagenesE
			if (itemCarta.id === null) {
				carta.create(itemCarta)
				return ok("Plato creado correctamente")
			} else {
				carta.update(itemCarta)
				return ok("Plato actualizado correctamente")
			}
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		} 
	}
	
	@Post("/carta/:id/eliminarPlato")
	def Result eliminarPlato() {
		try {
			var ItemCarta itemCarta
			try {
				itemCarta = carta.searchById(new Long(id))
			} catch(Exception ex) {
				return ok('{ "error" : "Plato no encontrado" }')
			} 
			itemCarta.darDeBaja()
			return ok("Plato eliminado")
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
}