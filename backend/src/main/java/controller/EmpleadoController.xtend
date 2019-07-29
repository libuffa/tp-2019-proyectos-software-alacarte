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
			if (empleado === null || empleado.baja) {
				return ok('{ "error" : "Usuario incorrecto" }')
			}
			if (!empleado.contraseña.equals(contraseña)) {
				return ok('{ "error" : "Contraseña incorrecta" }')
			}
			if (empleado.logueado) {
				empleado.loguearDesloguear()
				return ok('{ "error" : "Usuario logueado" }')
			}
			empleado.loguearDesloguear()
			return ok(empleado.toJson)
		} catch (Exception e) {
			return ok('{ "error" : "Usuario incorrecto" }')
		}
	}

	@Post("/empleado/cerrarSesion")
	def Result cerrarSesion(@Body String body) {
		val idEmpleado = Long.valueOf(body.getPropertyValue("idEmpleado"))

		try {
			var Empleado empleado
			try{
				empleado = repoEmpleados.searchById(idEmpleado)
			} catch(Exception ex) {
				return ok('{ "error" : "Usuario incorrecto" }')
			}
			if (empleado === null || !empleado.logueado || empleado.baja) {
				return ok('{ "error" : "Usuario no logueado" }')
			}
			empleado.loguearDesloguear()
			return ok("Usuario cerrado correctamente")
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}

	@Get("/empleado/:id")
	def Result getEmpleado() {
		try {
			val _id = Long.valueOf(id)
			var Empleado empleado
			try{
				empleado = repoEmpleados.searchById(_id)
			} catch(Exception ex) {
				return ok('{ "error" : "Usuario inexistente" }')
			}
			if (empleado === null || empleado.baja) {
				return ok('{ "error" : "Usuario inexistente" }')
			}
			return ok(empleado.toJson)
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
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
			val empleadosActivos = empleados.filter[empleado|!empleado.baja].toList
			return ok(empleadosActivos.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/empleado/:username/validar")
	def Result validarUsername() {
		try {
			var Empleado empleado
			try{
				empleado = repoEmpleados.searchByString(username)
			} catch(Exception e) {
				return ok("true")
			}
			if (empleado !== null) {
				return ok('{ "error" : "El nombre de usuario ya existe" }')
			} else {
				return ok("true")
			}
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Post("/empleado/mail/validar")
	def Result validarMail(@Body String body) {
		val emailE = String.valueOf(body.getPropertyValue("email"))
		
		try {
			var Empleado empleado
			try{
				empleado = repoEmpleados.searchByEmail(emailE)
			} catch(Exception e) {
				return ok("true")
			}
			if (empleado !== null) {
				return ok('{ "error" : "El mail ya existe" }')
			} else {
				return ok("true")
			}
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
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
				return ok('{ "error" : "Usuario incorrecto" }')
			}
			if (!empleado.contraseña.equals(contraseñaActual)) {
				return ok('{ "error" : "Contraseña actual incorrecta" }')
			}
			empleado.cambiarContraseña(contraseñaNueva)
			return ok("Contraseña modificada correctamente")
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}

	@Put("/empleado/recuperarContraseña")
	def Result recuperarContraseña(@Body String body) {
		try {
			val correoUsuario = body.getPropertyValue("email")
			var Empleado empleado

			try {
				empleado = repoEmpleados.searchByEmail(correoUsuario)
			} catch (Exception ex) {
				return ok('{ "error" : "correo inexistente" }')
			}
			if (!empleado.email.equals(correoUsuario)) {
				return ok('{ "error" : "Correo de usuario incorrecto" }')
			}
			return ok("True")
		} catch (Exception e) {
			return ok('{ "error" : "correo inexistente" }')
		}
	}

	@Post("/empleado/eliminar")
	def Result eliminarEmpleado(@Body String body) {
		val idEmpleado = Long.valueOf(body.getPropertyValue("id"))

		try {
			val empleado = repoEmpleados.searchById(idEmpleado)
			if (empleado === null || empleado.baja) {
				return ok('{ "error" : "Usuario inexistente" }')
			}
			empleado.darDeBaja()
			return ok("Usuario eliminado correctamente")
		} catch (Exception e) {
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
			var Empleado empleado
			try {
				empleado = repoEmpleados.searchById(idEmpleado)
			} catch (Exception e) {
				try {
					empleado = repoEmpleados.searchByString(nombreUsuarioE)
					return ok('{ "error" : "El nombre de usuario ya existe" }')
				} catch (Exception es) {
					empleado = new Empleado
				}
			}
			if (empleado.nombreUsuario !== nombreUsuarioE) {
				try {
					val empleadoDos = repoEmpleados.searchByString(nombreUsuarioE)
					if (empleadoDos.nombreUsuario === empleado.nombreUsuario){
						return ok('{ "error" : "El nombre de usuario ya existe" }')
					}
				} catch(Exception esa) {}
			}
			empleado.nombreUsuario = nombreUsuarioE
			empleado.contraseña = contraseñaE
			empleado.email = emailE
			empleado.nombre = nombreE
			empleado.apellido = apellidoE
			if (tipoEmpleadoE !== null) {
				empleado.tipoEmpleado = TipoEmpleado.valueOf(tipoEmpleadoE)
			} else {
				return ok('{ "error" : "Puesto no seleccionado" }')
			}
			if (empleado.id === null || empleado.baja) {
				repoEmpleados.create(empleado)
				return ok("Empleado creado correctamente")
			} else {
				repoEmpleados.update(empleado)
				return ok("Empleado actualizado correctamente")
			}
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')

		}
	}
	
	@Put('/crear/mail')
	def Result enviarMailCrear(@Body String body){
		val nombreUsuarioE = String.valueOf(body.getPropertyValue("nombreUsuario"))
		
		try {
			val empleado = repoEmpleados.searchByString(nombreUsuarioE)
			if(empleado === null || empleado.baja){
				return ok('{ "error" : "Empleado erróneo" }')
			}
			empleado.altaDeUsuario()
			return ok("Mail enviado correctamente")
		} catch(Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Put('/recuperar/mail')
	def Result enviarMailRecuperar(@Body String body){
		try {
			val correoUsuario = body.getPropertyValue("email")
			var Empleado empleado

			try {
				empleado = repoEmpleados.searchByEmail(correoUsuario)
			} catch (Exception ex) {
				return ok('{ "error" : "correo inexistente" }')
			}
			if (!empleado.email.equals(correoUsuario)) {
				return ok('{ "error" : "Correo de usuario incorrecto" }')
			}
			empleado.recuperarContraseña
			return ok("True")
		} catch (Exception e) {
			return ok('{ "error" : "correo inexistente" }')
		}
	}
}
