package domain

import java.util.ArrayList
import java.util.List
import javax.persistence.CollectionTable
import javax.persistence.Column
import javax.persistence.ElementCollection
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.JoinColumn
import org.eclipse.xtend.lib.annotations.Accessors
import javax.persistence.FetchType

@Entity
@Accessors
class ItemCarta {

	@Id
	@GeneratedValue
	Long id

	@Column(length=50)
	String titulo

	@Column(length=100)
	String descripcion

	@Enumerated(EnumType.STRING)
	@Column(length=20)
	Categoria categoria
	
	@Column
	String subCategoria
	
	@Column
	Double precioUnitario

	@Column
	Boolean habilitado

	@ElementCollection(fetch=FetchType.EAGER)
	List<String> imagenes = new ArrayList<String>();
	
	def cambiarEstado(){
		habilitado = !habilitado
	}
	
	def noEsBebida() {
		!categoria.equals(Categoria.Bebida)
	}

}
