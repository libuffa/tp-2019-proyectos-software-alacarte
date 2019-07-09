package controller

import domain.empleado.Empleado
import domain.empleado.TipoEmpleado
import java.util.ArrayList
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.api.annotation.Put
import org.uqbar.xtrest.json.JSONUtils
import repository.EmpleadoRepository
import repository.MesaRepository
import repository.SesionRepository

@Controller
@Accessors
class EmpleadoController {

	extension JSONUtils = new JSONUtils
	EmpleadoRepository repoEmpleados = EmpleadoRepository.instance
	MesaRepository repoMesas = MesaRepository.instance
	SesionRepository repoSesiones = SesionRepository.instance

	@Post("/empleado/iniciarSesion")
	def Result iniciarSesion(@Body String body) {
		val nombreUsuario = body.getPropertyValue("nombreUsuario")
		val contraseña = body.getPropertyValue("contraseña")

		try {
			val empleado = repoEmpleados.searchByString(nombreUsuario)
			if (empleado === null || empleado.logueado || empleado.baja) {
				return ok("Usuario logueado o incorrecto")
			}
			if (!empleado.contraseña.equals(contraseña)) {
				return ok("Contraseña incorrecta")
			}
			empleado.loguearDesloguear()
			return ok(empleado.toJson)
		} catch (Exception e) {
			return ok("Usuario incorrecto")
		}
	}

	@Post("/empleado/cerrarSesion")
	def Result cerrarSesion(@Body String body) {
		val idEmpleado = Long.valueOf(body.getPropertyValue("idEmpleado"))

		try {
			val empleado = repoEmpleados.searchById(idEmpleado)
			if (empleado === null || !empleado.logueado || empleado.baja) {
				return ok("Usuario no logueado")
			}
			empleado.loguearDesloguear()
			return ok("Usuario cerrado correctamente")
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/empleado/:id")
	def Result getEmpleado() {
		try {
			val _id = Long.valueOf(id)
			var empleado = repoEmpleados.searchById(_id)
			if (empleado === null || empleado.baja) {
				return badRequest('{ "error" : "usuario inexistente" }')
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
			if (empleado === null || empleado.baja) {
				return badRequest("Usuario incorrecto")
			}
			val tipoEmpleado = empleado.tipoEmpleado
			var List<String> opciones = new ArrayList
			switch tipoEmpleado {
				case TipoEmpleado.Mozo: opciones = #["carta", "mesas"]
				case TipoEmpleado.Cocinero: opciones = #["carta", "pedidos"]
				default: opciones = #["carta", "administrar_mesas", "empleados"]
			}
			return ok(opciones.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	
	@Get("/empleados")
	def Result getEmpleados() {
		try {
			val empleados = repoEmpleados.allInstances()
			val empleadosActivos = empleados.filter[empleado | !empleado.baja].toList
			return ok(empleadosActivos.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Put("/empleado/cambiarContraseña")
	def Result cambiarContraseña(@Body String body) {
		try {
			val idEmpleado = Long.valueOf(body.getPropertyValue("idEmpleado"))
			val contraseñaActual = body.getPropertyValue("contraseñaActual")
			val contraseñaNueva = body.getPropertyValue("contraseñaNueva")
			val empleado = repoEmpleados.searchById(idEmpleado)
			if (empleado === null || empleado.baja) {
				return badRequest('{ "error" : "Usuario inexistente" }')
			}
			if (!empleado.contraseña.equals(contraseñaActual)) {
				return badRequest('{ "error" : "Contraseña actual incorrecta" }')
			}
			empleado.cambiarContraseña(contraseñaNueva)
			return ok("Contraseña modificada correctamente")
		}catch(Exception e) {
			return ok(e.message)
		}
	}
	
	@Post("/empleado/eliminar")
	def Result eliminarEmpleado(@Body String body) {
		val idEmpleado = Long.valueOf(body.getPropertyValue("id"))
		
		try {
			val empleado = repoEmpleados.searchById(idEmpleado)
			if(empleado === null || empleado.baja) {
				return ok('{ "error" : "Usuario inexistente" }')
			}
			empleado.darDeBaja()
			return ok("Usuario eliminado correctamente")
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Put("/empleado/agregarEmpleado")
	def Result agregarEmpleado(@Body String body) {
		val idEmpleado = Long.valueOf(body.getPropertyValue("id"))
		val nombreUsuarioE = String.valueOf(body.getPropertyValue("nombreUsuario"))
		val contraseñaE = String.valueOf(body.getPropertyValue("contraseña"))
		val emailE = String.valueOf(body.getPropertyValue("email"))
		val nombreE = String.valueOf(body.getPropertyValue("nombre"))
		val apellidoE = String.valueOf(body.getPropertyValue("apellido"))
		val tipoEmpleadoE = String.valueOf(body.getPropertyValue("tipoEmpleado"))
		
		try {
			var empleado = repoEmpleados.searchById(idEmpleado)
			if(empleado === null || empleado.baja){
				empleado = new Empleado
			}
			empleado.nombreUsuario = nombreUsuarioE
			empleado.contraseña = contraseñaE
			empleado.email = emailE
			empleado.nombre = nombreE
			empleado.apellido = apellidoE
			if(tipoEmpleadoE !== null){
				empleado.tipoEmpleado = TipoEmpleado.valueOf(tipoEmpleadoE)
			} else {
				return ok ('{ "error" : "Puesto no seleccionado" }')
			}
			if(empleado.id === null || empleado.baja){
				repoEmpleados.create(empleado)
				return ok("Empleado creado correctamente")
			} else {
				repoEmpleados.update(empleado)
				return ok("Empleado actualizado correctamente")
			}
		}catch(Exception e){
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
}
