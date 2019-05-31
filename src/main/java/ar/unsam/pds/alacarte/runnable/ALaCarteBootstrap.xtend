package ar.unsam.pds.alacarte.runnable

import ar.unsam.pds.alacarte.domain.carta.Categoria
import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import ar.unsam.pds.alacarte.repository.Carta
import org.uqbar.arena.bootstrap.CollectionBasedBootstrap

class ALaCarteBootstrap extends CollectionBasedBootstrap {

	Carta carta = Carta.instance

	ItemCarta antiPasto
	ItemCarta milanesa
	ItemCarta pizza

	override run() {
		
		antiPasto = new ItemCarta => [
			titulo = "Antipasto"
			descripcion = "Quesito, salame y otros"
			categoria = Categoria.Entrada
			precioUnitario = 80.doubleValue
			habilitado = true
		]
		milanesa = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.PlatoPrincipal
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		pizza = new ItemCarta => [
			titulo = "Pizza de muzzarella"
			descripcion = "Pizza con tomate y queso muzzarella"
			categoria = Categoria.PlatoPrincipal
			precioUnitario = 300.doubleValue
			habilitado = true
		]
		
		carta.create(antiPasto)
		carta.create(milanesa)
		carta.create(pizza)
	}

}
