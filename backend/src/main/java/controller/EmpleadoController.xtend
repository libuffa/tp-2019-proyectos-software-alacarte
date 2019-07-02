package controller

import domain.Sesion
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
		
		try{
			val empleado = repoEmpleados.searchByString(nombreUsuario)
			if(empleado === null || empleado.logueado) {
				return ok("Usuario logueado o incorrecto")
			}
			if(!empleado.contraseña.equals(contraseña)) {
				return ok("Contraseña incorrecta")
			}
			empleado.loguearDesloguear()
			return ok(empleado.toJson)
		}catch(Exception e) {
			return ok("Usuario incorrecto")
		}
	}
	
	@Post("/empleado/cerrarSesion")
	def Result cerrarSesion(@Body String body) {
		val idEmpleado = Long.valueOf(body.getPropertyValue("idEmpleado"))
		
		try{
			val empleado = repoEmpleados.searchById(idEmpleado)
			if(empleado === null || !empleado.logueado) {
				return ok("Usuario no logueado")
			}
			empleado.loguearDesloguear()
			return ok("Usuario cerrado correctamente")
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
			if(empleado === null) {
				return badRequest("Usuario incorrecto")
			}
			val tipoEmpleado = empleado.class
			var List<String> opciones = new ArrayList
			switch tipoEmpleado {
				case Mozo: opciones = #["carta","mesas"]
				case Cocinero: opciones = #["carta","pedidos"]
				default: opciones = #["carta","administrar_mesas","empleados"]
			}
			return ok(opciones.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/mesas")
	def Result getMesas() {
		try{
			val mesas = repoMesas.allInstances()
			return ok(mesas.toJson)
		}catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Get("/mesas/:id")
	def Result getMesa() {
		val idMesa = Long.valueOf(id)
		try{
			val mesas = repoMesas.allInstances()
			val mesa = mesas.filter[mesa | mesa.id === idMesa].get(0)
			return ok(mesa.toJson)
		}catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Post("/mesas/estado")
	def Result asignarDesasignarMesa(@Body String body) {
		val idMesaBody = Long.valueOf(body.getPropertyValue("idMesa"))
		val idMozoBody = Long.valueOf(body.getPropertyValue("idMozo"))
		try{
			val mesaRepo = repoMesas.searchById(idMesaBody)
			if(mesaRepo === null){
				return ok("Mesa incorrecta")
			}
			var sesion = mesaRepo.getSesion()
			if(sesion === null) {
				val mozoRepo = repoEmpleados.searchById(idMozoBody)
				sesion = new Sesion => [
					mesa = mesaRepo
					mozo = mozoRepo
					idMozo = idMozoBody
					idMesa = idMesaBody
				]
				repoSesiones.create(sesion)
				return ok("Mesa asignada correctamente")
			} else {
				sesion.cerrarSesion()
				return ok("Mesa cerrada correctamente")
			}
		}catch(Exception e) {
			return ok("Error en el servidor")
		}
	}
	
	@Get("/empleados")
	def Result getEmpleados(){
		try{
			val empleados = repoEmpleados.allInstances()
			return ok(empleados.toJson)
		}catch(Exception e) {
			badRequest(e.message)
		}
	}
	
	@Put("/empleado/cambiarContraseña")
	def Result cambiarContraseña(@Body String body) {
		try{
			val idEmpleado = Long.valueOf(body.getPropertyValue("idEmpleado"))
			val contraseñaActual = body.getPropertyValue("contraseñaActual")
			val contraseñaNueva = body.getPropertyValue("contraseñaNueva")
			val empleado = repoEmpleados.searchById(idEmpleado)
			
			if(empleado === null){
				return badRequest('{ "error" : "usuario inexistente" }')
			}
			if(!empleado.contraseña.equals(contraseñaActual)) {
				return badRequest('{ "error" : "Contraseña actual incorrecta" }')
			}
			
			empleado.cambiarContraseña(contraseñaNueva)
			
			return ok("Contraseña modificada correctamente")
			
		}catch(Exception e) {
			return ok(e.message)
		}
	}
	
	@Get("/empleado/recuperarContraseña")
	def Result recuperarContraseña(@Body String body) {
		try{
			val idEmpleado = Long.valueOf(body.getPropertyValue("idEmpleado"))
			val correoUsuario = body.getPropertyValue("correoUsuario")
			val empleado = repoEmpleados.searchById(idEmpleado)
			
			if(empleado === null){
				return badRequest('{ "error" : "usuario inexistente" }')
			}
			if(!empleado.email.equals(correoUsuario)) {
				return badRequest('{ "error" : "Correo de usuario incorrecto" }')
			}
			
			val email = empleado.email
			
			return ok("True")
			
		}catch(Exception e) {
			return ok(e.message)
		}
	}
}
