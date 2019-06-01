package domain

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Inheritance
import javax.persistence.InheritanceType
import org.eclipse.xtend.lib.annotations.Accessors

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

}
