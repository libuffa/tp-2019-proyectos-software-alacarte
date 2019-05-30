package ar.unsam.pds.alacarte

import ar.unsam.pds.alacarte.domain.carta.Categoria
import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import ar.unsam.pds.alacarte.domain.pedido.Pedido
import ar.unsam.pds.alacarte.repository.Carta
import java.sql.DriverManager
import org.junit.After
import org.junit.Assert
import org.junit.Before
import org.junit.Test

class TestCarta {

	ItemCarta antiPasto

	ItemCarta milanesa
	ItemCarta pizza

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

		Carta.instance.create(antiPasto)
		Carta.instance.create(milanesa)
		Carta.instance.create(pizza)

	}

//	@After
//	def void end() {
//		val conexion = DriverManager.getConnection("jdbc:mysql://localhost:3306/aLaCarte", "root", "");
//		conexion.prepareStatement("DELETE FROM aLaCarte.ItemCarta;").executeQuery()
//	}
	@Test
	def void probarTamanioCarta() {
		Assert.assertEquals(1, Carta.instance.allInstances.size)
	}

	@Test
	def void probarPrecioMilanesa() {
		Assert.assertEquals(100, Carta.instance.searchById(1).precioUnitario, 0.01)
	}

	@Test
	def void probarPedirPedido() {
		Assert.assertEquals(
			"Sin sal por favor",
			Carta.instance.searchById(1).pedirItem(2, "Sin sal por favor").comentarios
		)
	}

	@Test
	def void probarSearchByCategoria() {
		val carta = Carta.instance.searchByCategoria(Categoria.PlatoPrincipal)
		println(carta)
		Assert.assertEquals(Categoria.PlatoPrincipal, carta.map[item|item.categoria].get(0))
	}

}
