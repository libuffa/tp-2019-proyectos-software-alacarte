package controller

import domain.empleado.Cocinero
import domain.empleado.Mozo
import java.util.ArrayList
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.json.JSONUtils
import repository.EmpleadoRepository

@Controller
@Accessors
class EmpleadoController {

	extension JSONUtils = new JSONUtils
	EmpleadoRepository repoEmpleados = EmpleadoRepository.instance

	@Post("/empleado/iniciarSesion")
	def Result iniciarSesion(@Body String body) {
		try{
			val nombreUsuario = body.getPropertyValue("nombreUsuario")
			val contraseña = body.getPropertyValue("contraseña")
			val empleado = repoEmpleados.searchByString(nombreUsuario)
			println(empleado)
			
			if(empleado === null) {
				return badRequest('{ "error" : "usuario inexistente" }')
			}
			
			if(!empleado.contraseña.equals(contraseña)) {
				return badRequest('{ "error" : "contraseña incorrecta" }')
			}
			
			println(empleado)
			return ok(empleado.toJson)
		}catch(Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/empleado/:id")
	def Result getEmpleado() {
		try {
			val _id = Long.valueOf(id)
			var empleado = repoEmpleados.searchById(_id)
			
			if(empleado === null) {
				empleado = repoEmpleados.allInstances.get(0)
//				return badRequest('{ "error" : "usuario inexistente" }')
			}
			
			return ok(empleado.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/empleado/:id/menu")
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
