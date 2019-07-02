package domain.empleado

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Inheritance
import javax.persistence.InheritanceType
import org.eclipse.xtend.lib.annotations.Accessors
import repository.EmpleadoRepository

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@Accessors
abstract class Empleado {

	@Id
	@GeneratedValue
	Long id

	@Column(name="Usuario")
	String nombreUsuario
	
	@Column(length=100)
	String contraseña

	@Column(length=100)
	String email

	@Column(length=100)
	String nombre

	@Column(length=100)
	String apellido
	
	@Column
	Boolean logueado = false

	def loguearDesloguear() {
		this.logueado = !this.logueado
		EmpleadoRepository.instance.update(this)
	}
	
	def cambiarContraseña(String contraseñaNueva) {
		this.contraseña = contraseñaNueva
		EmpleadoRepository.instance.update(this)
	}
	
	def recuperarContraseña() {
//		val correo = new Email
	}
}
