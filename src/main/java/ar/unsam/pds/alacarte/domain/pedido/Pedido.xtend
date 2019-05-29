package ar.unsam.pds.alacarte.domain.pedido

import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.EnumType
import javax.persistence.Enumerated
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToOne
import org.eclipse.xtend.lib.annotations.Accessors

@Entity
@Accessors
class Pedido {
	
	@Id
	@GeneratedValue
	Long id
	
	@OneToOne(fetch=FetchType.LAZY)
	ItemCarta itemCarta
	
	@Column
	Integer cantidad
	
	@Column(length=100)
	String comentarios
	
	@Enumerated(EnumType.STRING)
    @Column(length = 20)
	Estado estado
	
}