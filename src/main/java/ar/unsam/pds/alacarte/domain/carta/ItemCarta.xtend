package ar.unsam.pds.alacarte.domain.carta

import ar.unsam.pds.alacarte.domain.pedido.Estado
import ar.unsam.pds.alacarte.domain.pedido.Pedido
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
	Double precioUnitario

	@Column
	Boolean habilitado

	@ElementCollection
	@CollectionTable(name="imagenes", joinColumns=@JoinColumn(name="itemCarta_Id"))
	@Column(name="imagenes")
	List<String> imagenes = new ArrayList

	def pedirItem(Integer cantidad, String comentarios) {
		new Pedido => [
			it.itemCarta = this
			it.cantidad = cantidad
			it.comentarios = comentarios
			it.estado = Estado.Creado
		]
	}
	
	def cambiarEstado(){
		habilitado = !habilitado
	}

}
