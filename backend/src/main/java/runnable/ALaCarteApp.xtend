package runnable

import controller.CartaController
import controller.EmpleadoController
import controller.MesaController
import controller.SesionController
import org.uqbar.xtrest.api.XTRest

class ALaCarteApp {
	
	def static void main(String[] args) {
		new ALaCarteBootstrap().run
		XTRest.start(9000, CartaController, SesionController, EmpleadoController,MesaController)
	}
	
}