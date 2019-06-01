package domain

import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class Pedido {
	
	ItemCarta itemCarta
	
	Integer cantidad
	
	String comentarios
	
	Estado estado
	
}