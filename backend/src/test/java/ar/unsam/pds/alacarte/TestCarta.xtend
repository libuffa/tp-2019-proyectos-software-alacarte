package ar.unsam.pds.alacarte

import domain.Categoria
import domain.ItemCarta
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import repository.ItemCartaRepository

class TestCarta {

	ItemCarta antiPasto
	ItemCarta milanesa
	ItemCarta pizza

	ItemCartaRepository carta = ItemCartaRepository.instance

	@Before
	def void init() {
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

//	@After
//	def void end() {
//		val conexion = DriverManager.getConnection("jdbc:mysql://localhost:3306/aLaCarte", "root", "");
//		conexion.prepareStatement("DELETE FROM aLaCarte.ItemCarta;").executeQuery()
//	}
	@Test
	def void probarTamanioCarta() {
		Assert.assertEquals(1, carta.allInstances.size)
	}

	@Test
	def void probarPrecioMilanesa() {
		Assert.assertEquals(100, carta.searchById(1).precioUnitario, 0.01)
	}

	@Test
	def void probarPedirPedido() {
		Assert.assertEquals(
			"Sin sal por favor",
			carta.searchById(1).pedirItem(2, "Sin sal por favor").comentarios
		)
	}

	@Test
	def void probarSearchByCategoria() {
		val carta = carta.searchByCategoria(Categoria.PlatoPrincipal)
		println(carta)
		Assert.assertEquals(Categoria.PlatoPrincipal, carta.map[item|item.categoria].get(0))
	}

}
