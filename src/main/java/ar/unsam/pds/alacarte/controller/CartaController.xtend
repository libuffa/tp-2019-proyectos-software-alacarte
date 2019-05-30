package ar.unsam.pds.alacarte.controller

import ar.unsam.pds.alacarte.domain.carta.Categoria
import ar.unsam.pds.alacarte.repository.Carta
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.json.JSONUtils

@Controller
@Accessors
class CartaController {

	extension JSONUtils = new JSONUtils

	@Get("/carta/:categoria")
	def Result usuario() {
		val _categoria = Categoria.valueOf(categoria)
		val items = Carta.instance.searchByCategoria(_categoria)
		ok(items.toJson)
	}

}
