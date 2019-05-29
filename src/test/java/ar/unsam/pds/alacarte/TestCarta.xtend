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

	ItemCarta milanesa
	Pedido pedido1

	@Before
	def void init() {
		milanesa = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.PlatoPrincipal
			precioUnitario = 100.doubleValue
			habilitado = true
		]
		Carta.instance.create(milanesa)

	}

	@After
	def void end() {
		val conexion = DriverManager.getConnection("jdbc:mysql://localhost:3306/aLaCarte", "root", "");
		conexion.prepareStatement("DELETE FROM aLaCarte.ItemCarta;")
	}

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

}
