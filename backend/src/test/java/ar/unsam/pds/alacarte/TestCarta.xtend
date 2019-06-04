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
		bootstrap = new ALaCarteBootstrap()
		bootstrap.run
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
		val carta = bootstrap.carta.searchByCategoria(Categoria.PlatoPrincipal)
		Assert.assertEquals(Categoria.PlatoPrincipal, carta.map[item|item.categoria].get(0))
	}
	
	@Test
	def void probarSearchByExample() {
		val example = bootstrap.carta.searchExampleById(bootstrap.milanesa)
		Assert.assertEquals(example.id, bootstrap.carta.searchExampleById(bootstrap.milanesa).id)
	}

}
