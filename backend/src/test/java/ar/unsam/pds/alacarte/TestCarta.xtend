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

}
