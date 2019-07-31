package domain.empleado

import domain.EmailSender
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Inheritance
import javax.persistence.InheritanceType
import org.eclipse.xtend.lib.annotations.Accessors
import repository.EmpleadoRepository

@Entity
@Inheritance(strategy=InheritanceType.JOINED)
@Accessors
class Empleado {

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
	
	@Enumerated(EnumType.STRING)
	@Column(length=20)
	TipoEmpleado tipoEmpleado
	
	@Column
	Boolean baja = false
	
	@Column
	Boolean notificaciones = false
	
	@Column
	Boolean nuevasNotificaciones = false
	
	transient Integer mesasAtendidas = 0
	
	def agregarNotificacion() {
		if(this.tipoEmpleado === TipoEmpleado.valueOf("Mozo")) {
			this.notificaciones = true
		}
	}
	
	def limpiarNotificaciones() {
		if(this.tipoEmpleado === TipoEmpleado.valueOf("Mozo")) {
			this.notificaciones = false
			EmpleadoRepository.instance.update(this)
		}
	}
	
	def cambiarEstadoNuevasNotificaciones() {
		if(this.tipoEmpleado === TipoEmpleado.valueOf("Mozo")) {
			if(!this.nuevasNotificaciones) {
				this.agregarNotificacion()
			}
			this.nuevasNotificaciones = !this.nuevasNotificaciones
			EmpleadoRepository.instance.update(this)
		}
	}

	def loguearDesloguear() {
		this.logueado = !this.logueado
		EmpleadoRepository.instance.update(this)
	}
	
	def cambiarContraseña(String contraseñaNueva) {
		this.contraseña = contraseñaNueva
		EmpleadoRepository.instance.update(this)
		
	}
	
	def recuperarContraseña() {
		val EmailSender emailSender = new EmailSender
		val mensaje = "Hola, " + this.nombre + "\n\n  Estás recibiendo este correo porque hiciste una solicitud de recuperación de contraseña para tu cuenta.\n\n  Te recordamos que tu contraseña es: " + this.contraseña + "\n\n  Si no realizaste esta solicitud, ignorá este mensaje.\n\n    Saludos cordiales,\n    El Equipo de À la Carte"
		emailSender.enviarMail(this.email, "À la Carte - Recupero de contraseña", mensaje)
	}
	
	def altaDeUsuario() {
		val EmailSender emailSender = new EmailSender
		val mensaje = "Hola, " + this.nombre + "\n\n  Has sido dado de alta como usuario en À la Carte por el administrador.\n  Este email contiene los datos necesarios para iniciar sesión.\n\n    Nombre de usuario: " + this.nombreUsuario + "\n    Contraseña: " + this.contraseña + "\n\n  Por favor, no respondas a este mensaje ya que ha sido generado automáticamente con el propósito de informarte.\n\n    Saludos cordiales,\n    El Equipo de À la Carte"
		emailSender.enviarMail(this.email, "À la Carte - Te damos la bienvenida", mensaje)
	}
	
	def darDeBaja() {
		this.baja = true
		this.email = ""
		EmpleadoRepository.instance.update(this)
	}
}
