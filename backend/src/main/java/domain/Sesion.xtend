package domain

import com.fasterxml.jackson.annotation.JsonIgnore
import domain.empleado.Mozo
import java.util.ArrayList
import java.util.List
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import org.eclipse.xtend.lib.annotations.Accessors
import repository.SesionRepository

@Entity
@Accessors
class Sesion {

	@Id
	@GeneratedValue
	Long id

	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	List<Pedido> pedidos = new ArrayList

	@OneToOne(fetch=FetchType.LAZY)
	@JsonIgnore Mesa mesa

	@OneToOne(fetch=FetchType.LAZY)
	Mozo mozo

	@Column
	Boolean habilitado
	
	new(){
		habilitado = true
	}

	def pedirItem(ItemCarta itemCarta, Integer cantidad, String comentarios) {
		val pedido = new Pedido => [
			it.itemCarta = itemCarta
			it.cantidad = cantidad
			it.comentarios = comentarios
			it.estado = Estado.Creado
		]
		this.pedidos.add(pedido)
		SesionRepository.instance.update(this)
	}

}
