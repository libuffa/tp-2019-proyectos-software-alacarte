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
	ItemCarta milanesa1
	ItemCarta milanesa2
	ItemCarta milanesa3
	ItemCarta milanesa4
	ItemCarta milanesa5
	ItemCarta milanesa6
	ItemCarta milanesa7
	ItemCarta milanesa8
	ItemCarta milanesa9
	ItemCarta milanesa10
	ItemCarta milanesa11
	ItemCarta milanesa12
	ItemCarta milanesa13
	
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
			subCategoria = "Picadas"
			precioUnitario = 80.doubleValue
			habilitado = true
		]
		milanesa = new ItemCarta => [
			titulo = "Mila con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		pizza = new ItemCarta => [
			titulo = "Muzza"
			descripcion = "Pizza con tomate y queso muzzarella"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 300.doubleValue
			habilitado = true
			imagenes= #["https://www.closetcooking.com/wp-content/uploads/2008/06/Shrimp-Scampi-Pizza-1200-3859.jpg"]
		]
		milanesa1 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa2 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa3 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 1500.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa4 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 30322.doubleValue
			habilitado = false
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa5 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa6 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa7 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa8 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa9 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa10 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa11 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa12 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Minutas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		milanesa13 = new ItemCarta => [
			titulo = "Milanesa con fritas"
			descripcion = "Lomo empanada con papas a la francesa"
			categoria = Categoria.Plato_Principal
			subCategoria = "Minutas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		
		carta.create(antiPasto)
		carta.create(milanesa)
		carta.create(milanesa1)
		carta.create(milanesa2)
		carta.create(milanesa3)
		carta.create(milanesa4)
		carta.create(milanesa5)
		carta.create(milanesa6)
		carta.create(milanesa7)
		carta.create(milanesa8)
		carta.create(milanesa9)
		carta.create(milanesa10)
		carta.create(milanesa11)
		carta.create(milanesa12)
		carta.create(milanesa13)
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
		
	}

}
