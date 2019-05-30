package ar.unsam.pds.alacarte.domain.pedido

import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import javax.persistence.Entity
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Pedido {
	
	ItemCarta itemCarta
	
	Integer cantidad
	
	String comentarios
	
	Estado estado
	
}