package runnable

import domain.Categoria
import domain.ItemCarta
import domain.Mesa
import domain.Pedido
import domain.Sesion
import domain.empleado.Mozo
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.arena.bootstrap.CollectionBasedBootstrap
import repository.EmpleadoRepository
import repository.ItemCartaRepository
import repository.MesaRepository
import repository.SesionRepository

@Accessors
class ALaCarteBootstrap extends CollectionBasedBootstrap {

	ItemCartaRepository carta = ItemCartaRepository.instance
	SesionRepository repoSesion = SesionRepository.instance
	EmpleadoRepository repoEmpleado = EmpleadoRepository.instance
	MesaRepository repoMesas = MesaRepository.instance

	ItemCarta antiPasto
	ItemCarta milanesa
	ItemCarta pizza
	
	Pedido pedido1
	Pedido pedido2
	
	Mesa mesa1
	
	Mozo claudia
	
	Sesion sesion1

	override run() {
		
		antiPasto = new ItemCarta => [
			titulo = "Antipasto"
			descripcion = "Quesito, salame y otros"
			categoria = Categoria.Entrada
			precioUnitario = 80.doubleValue
			habilitado = true
		]
		milanesa = new ItemCarta => [
			titulo = "Mila con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.PlatoPrincipal
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		pizza = new ItemCarta => [
			titulo = "Muzza"
			descripcion = "Pizza con tomate y queso muzzarella"
			categoria = Categoria.PlatoPrincipal
			precioUnitario = 300.doubleValue
			habilitado = true
			imagenes= #["https://www.closetcooking.com/wp-content/uploads/2008/06/Shrimp-Scampi-Pizza-1200-3859.jpg"]
		]
		
		carta.create(antiPasto)
		carta.create(milanesa)
		carta.create(pizza)
		
		mesa1 = new Mesa
		claudia = new Mozo => [
			nombreUsuario = "clauMorales"
			nombre = "Claudia"
			apellido = "Morales"
			contraseña = ""
			email = "cmorales@yahoo.com"
		]
		
		repoMesas.create(mesa1)
		repoEmpleado.create(claudia)
		
		pedido1 = new Pedido => [
			itemCarta = milanesa
			cantidad = 2
		]
		pedido2 = new Pedido => [
			itemCarta = pizza
			cantidad = 1
		]
		
		sesion1 = new Sesion => [
			mesa = repoMesas.searchExampleById(mesa1)
			mozo = repoEmpleado.searchMozoExampleById(claudia)
			pedidos = #[pedido1,pedido2]
		]
		
		repoSesion.create(sesion1)
		
//		sesion1.pedirItem(milanesa,2,"cocida")
//		sesion1.pedirItem(pizza,1,"")
		
	}

}
