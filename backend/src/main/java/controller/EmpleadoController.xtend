package controller

import domain.empleado.Cocinero
import domain.empleado.Mozo
import java.util.ArrayList
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.json.JSONUtils
import repository.EmpleadoRepository

@Controller
@Accessors
class EmpleadoController {

	extension JSONUtils = new JSONUtils
	EmpleadoRepository repoEmpleados = EmpleadoRepository.instance

	@Get("/empleado/:id")
	def Result getEmpleado() {
		try {
			val _id = Long.valueOf(id)
			val empleado = repoEmpleados.searchById(_id)
			
			if(empleado === null) {
				return badRequest('{ "error" : "usuario inexistente" }')
			}
			
			return ok(empleado.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/empleado/menu/:id")
	def Result getMenuEmpleado() {
		try {
			val _id = Long.valueOf(id)
			val empleado = repoEmpleados.searchById(_id)
			
			if(empleado === null) {
				return badRequest('{ "error" : "usuario inexistente" }')
			}
			
			val tipoEmpleado = empleado.class
			
			var List<String> opciones = new ArrayList
			
			switch tipoEmpleado {
				case Mozo: opciones = #["carta","mesaMozo"]
				case Cocinero: opciones = #["carta","pedidoCocinero"]
				default: opciones = #["carta","mesaAdm","empleado"]
			}

			return ok(opciones.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

}
