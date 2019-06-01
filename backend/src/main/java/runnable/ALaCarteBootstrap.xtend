package runnable

import domain.Categoria
import domain.ItemCarta
import org.uqbar.arena.bootstrap.CollectionBasedBootstrap
import repository.ItemCartaRepository

class ALaCarteBootstrap extends CollectionBasedBootstrap {

	ItemCartaRepository carta = ItemCartaRepository.instance

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
