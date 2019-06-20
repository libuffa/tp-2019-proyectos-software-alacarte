package ar.unsam.pds.alacarte

import domain.Categoria
import org.junit.Assert
import org.junit.Before
import org.junit.Test
import runnable.ALaCarteBootstrap

class TestCarta {

	ALaCarteBootstrap bootstrap
	
	@Before
	def void init() {
<<<<<<< HEAD
		bootstrap = new ALaCarteBootstrap()
		bootstrap.run
=======
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
			categoria = Categoria.Plato_Principal
			precioUnitario = 100.doubleValue
			habilitado = true
		]
		pizza = new ItemCarta => [
			titulo = "Pizza de muzzarella"
			descripcion = "Pizza con tomate y queso muzzarella"
			categoria = Categoria.Plato_Principal
			precioUnitario = 300.doubleValue
			habilitado = true
		]

		carta.create(antiPasto)
		carta.create(milanesa)
		carta.create(pizza)

>>>>>>> 81954ed6ddfccfefede30905da8fa3b2d8802d8d
	}

//	@After
//	def void end() {
//		val conexion = DriverManager.getConnection("jdbc:mysql://localhost:3306/aLaCarte", "root", "");
//		conexion.prepareStatement("DELETE FROM aLaCarte.ItemCarta;").executeQuery()
//	}

	@Test
	def void probarPrecioMilanesa() {
		Assert.assertEquals(80, bootstrap.carta.searchById(1).precioUnitario, 0.01)
	}

	@Test
	def void probarSearchByCategoria() {
		val carta = bootstrap.carta.searchByCategoria(Categoria.Plato_Principal)
		Assert.assertEquals(Categoria.Plato_Principal, carta.map[item|item.categoria].get(0))
	}
	
	@Test
<<<<<<< HEAD
	def void probarSearchByExample() {
		val example = bootstrap.carta.searchExampleById(bootstrap.milanesa)
		Assert.assertEquals(example.id, bootstrap.carta.searchExampleById(bootstrap.milanesa).id)
=======
	def void probarSearchByCategoria() {
		val carta = carta.searchByCategoria(Categoria.Plato_Principal)
		println(carta)
		Assert.assertEquals(Categoria.Plato_Principal, carta.map[item|item.categoria].get(0))
>>>>>>> 81954ed6ddfccfefede30905da8fa3b2d8802d8d
	}

}
