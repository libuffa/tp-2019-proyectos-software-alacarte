package ar.unsam.pds.alacarte.runnable

import ar.unsam.pds.alacarte.controller.CartaController
import org.uqbar.xtrest.api.XTRest

class ALaCarteApp {
	
	def static void main(String[] args) {
		new ALaCarteBootstrap().run
		XTRest.start(9000, CartaController)
	}
	
}