package ar.unsam.pds.alacarte

import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import ar.unsam.pds.alacarte.repository.Carta
import org.junit.After
import org.junit.Assert
import org.junit.Before
import org.junit.Test

class TestCarta {

	ItemCarta milanesa

	@Before
	def void init() {
		milanesa = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Carta.PLATO_PRINCIPAL
		]
		Carta.instance.create(milanesa)
	}

//	@After
//	def void end() {
//		Carta.instance.
//	}

	@Test
	def void probarClubDeLaPelea() {
		Assert.assertEquals(1, Carta.instance.allInstances.size)
	}

}
