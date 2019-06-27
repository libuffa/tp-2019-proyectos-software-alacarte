package domain

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToOne
import org.eclipse.xtend.lib.annotations.Accessors
import repository.ItemCartaRepository

@Entity
@Accessors
class Pedido {

	@Id
	@GeneratedValue
	Long id

	@OneToOne(fetch=FetchType.EAGER)
	ItemCarta itemCarta

	@Column
	Integer cantidad

	@Column(length=250)
	String comentarios

	@Enumerated(EnumType.STRING)
	@Column(length=20)
	Estado estado

	@Column
	Boolean cancelado = false

	new() {
		comentarios = ""
		estado = Estado.Creado
	}

	def getItemCarta() {
		ItemCartaRepository.instance.searchExampleById(this.itemCarta)
	}

	def siguienteEstado() {
		if(this.itemCarta.categoria == Categoria.Bebida){
			switch estado {
				case Estado.Creado: this.estado = Estado.Entregado
				default: null
			}
		} else {
			switch estado {
				case Estado.Creado: this.estado = Estado.En_Curso
				case Estado.En_Curso: this.estado = Estado.Finalizado
				case Estado.Finalizado: this.estado = Estado.Entregado
				default: null
			}
		}
	}

}

