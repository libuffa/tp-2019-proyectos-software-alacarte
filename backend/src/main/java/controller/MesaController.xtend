package controller

import domain.Mesa
import domain.Sesion
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.json.JSONUtils
import repository.EmpleadoRepository
import repository.MesaRepository
import repository.SesionRepository
import domain.empleado.TipoEmpleado

@Controller
@Accessors
class MesaController {
	
	extension JSONUtils = new JSONUtils
	EmpleadoRepository repoEmpleados = EmpleadoRepository.instance
	MesaRepository repoMesas = MesaRepository.instance
	SesionRepository repoSesiones = SesionRepository.instance
	
	@Get("/mesas")
	def Result getMesas() {
		try {
			val mesasRepo = repoMesas.allInstances()
			val mesas = mesasRepo.filter(mesa | !mesa.baja).toList
			return ok(mesas.toJson)
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}

	@Get("/mesas/:id")
	def Result getMesa() {
		val idMesa = Long.valueOf(id)
		try {
			val mesas = repoMesas.allInstances()
			val mesa = mesas.filter[mesa|mesa.id === idMesa].get(0)
			if(!mesa.baja) {
				return ok(mesa.toJson)
			} else {
				return ok('{ "error" : "Mesa inexistente" }')
			}
		} catch (Exception e) {
			return ok("Error en el servidor")
		}
	}

	@Post("/mesas/estado")
	def Result asignarDesasignarMesa(@Body String body) {
		val idMesaBody = Long.valueOf(body.getPropertyValue("idMesa"))
		val idMozoBody = Long.valueOf(body.getPropertyValue("idMozo"))
		try {
			val mesaRepo = repoMesas.searchById(idMesaBody)
			if (mesaRepo === null || mesaRepo.baja) {
				return ok('{ "error" : "Mesa inexistente" }')
			}
			var sesion = mesaRepo.getSesion()
			if (sesion === null) {
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
		} catch (Exception e) {
				return ok('{ "error" : "Mesa inexistente" }')
		}
	}

	@Post("/mesas/eliminar")
	def Result eliminarMesa(@Body String body) {
		try {
			val idMesaBody = Long.valueOf(body.getPropertyValue("idMesa"))
			val idEmpleadoBody = Long.valueOf(body.getPropertyValue("idEmpleado"))
			val empleadoRepo = repoEmpleados.searchById(idEmpleadoBody)
			if (empleadoRepo === null || empleadoRepo.baja || empleadoRepo.tipoEmpleado !== TipoEmpleado.Administrador) {
				return ok('{ "error" : "Empleado no autorizado" }')
			}
			val mesaRepo = repoMesas.searchById(idMesaBody)
			if (mesaRepo === null || mesaRepo.baja) {
				return ok('{ "error" : "Mesa inexistente" }')
			}
			try{
				mesaRepo.darDeBaja()
				return ok('{ "ok" : "Mesa eliminada correctamente" }')
			} catch (Exception e) {
				return ok('{ "error" : "Error en el servidor" }')
			}
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	@Post("/mesas/crear")
	def Result crearMesa(@Body String body) {
		try {
			val idEmpleadoBody = Long.valueOf(body.getPropertyValue("idEmpleado"))
			val empleadoRepo = repoEmpleados.searchById(idEmpleadoBody)
			if (empleadoRepo === null || empleadoRepo.baja || empleadoRepo.tipoEmpleado !== TipoEmpleado.Administrador) {
				return ok('{ "error" : "Empleado no autorizado" }')
			}
			val mesa = repoMesas.allInstances.maxBy[mesa | mesa.numero]
			val numeroMesa = mesa.numero
			val mesaRepo = new Mesa => [ 
				numero = numeroMesa + 1
			]
			if (mesaRepo === null) {
				return ok('{ "error" : "Mesa inexistente" }')
			}
			repoMesas.create(mesaRepo)
			return ok('{ "ok" : "Mesa creada correctamente" }')
		} catch (Exception e) {
			return ok('{ "error" : "Error en el servidor" }')
		}
	}
	
	
}