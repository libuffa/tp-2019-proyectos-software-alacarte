package runnable

import domain.Categoria
import domain.ItemCarta
import domain.Mesa
import domain.Pedido
import domain.empleado.Empleado
import domain.empleado.TipoEmpleado
import org.eclipse.xtend.lib.annotations.Accessors
import repository.EmpleadoRepository
import repository.ItemCartaRepository
import repository.MesaRepository
import repository.SesionRepository

@Accessors
class ALaCarteBootstrap {

	ItemCartaRepository carta = ItemCartaRepository.instance
	SesionRepository repoSesion = SesionRepository.instance
	EmpleadoRepository repoEmpleado = EmpleadoRepository.instance
	MesaRepository repoMesas = MesaRepository.instance

	ItemCarta plato1
	ItemCarta plato2
	ItemCarta plato3
	ItemCarta plato4
	ItemCarta plato5
	ItemCarta plato6
	ItemCarta plato7
	ItemCarta plato8
	ItemCarta plato9
	ItemCarta plato10
	ItemCarta plato11
	ItemCarta plato12
	ItemCarta plato13
	ItemCarta plato14
	ItemCarta plato15
	ItemCarta plato16
	ItemCarta plato17
	ItemCarta plato18
	ItemCarta plato19
	ItemCarta plato20

	Mesa mesa1
	Mesa mesa2
	Mesa mesa3
	Mesa mesa4
	Mesa mesa5
	Mesa mesa6
	Mesa mesa7
	Mesa mesa8
	Mesa mesa9
	Mesa mesa10

	Empleado claudia
	Empleado monica
	Empleado pepe
	Empleado jose

	def run() {

		plato1 = new ItemCarta => [
			titulo = "Picada completa"
			descripcion = "Quesito, salame y papas finamente seleccionadas del paquete de lays"
			categoria = Categoria.Entrada
			subCategoria = "Picadas"
			precioUnitario = 250.doubleValue
			imagenes = #["/imagenes/picada.jpg", "/imagenes/picada.jpg", "/imagenes/picada.jpg"]
		]
		plato2 = new ItemCarta => [
			titulo = "Milanesa de ternera con papas fritas"
			descripcion = "Lomo empanado con papas al aceite"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 520.doubleValue
			imagenes = #["/imagenes/milanesa.jpg", "/imagenes/milanesa.jpg", "/imagenes/milanesa.jpg"]
		]
		plato3 = new ItemCarta => [
			titulo = "Pizza grande de muzzarella"
			descripcion = "Pizza de 8 porciones con salsa de tomate y queso muzzarella"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 350.doubleValue
			imagenes = #["/imagenes/pizza.jpg", "/imagenes/pizza.jpg", "/imagenes/pizza.jpg"]
		]
		plato4 = new ItemCarta => [
			titulo = "Coca Cola Regular"
			descripcion = "Bebida sabor cola con gas"
			categoria = Categoria.Bebida
			subCategoria = "Gaseosas"
			precioUnitario = 100.doubleValue
			imagenes = #["/imagenes/cocaReg.jpg", "/imagenes/cocaReg.jpg", "/imagenes/cocaReg.jpg"]
		]
		plato5 = new ItemCarta => [
			titulo = "Asado"
			descripcion = "Mix con 4 tipos de carnes cocidas al mejor punto"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 400.doubleValue
			imagenes = #["/imagenes/asado.jpg", "/imagenes/asado.jpg", "/imagenes/asado.jpg"]
		]
		plato6 = new ItemCarta => [
			titulo = "Lomo con pure"
			descripcion = "Lomo de carne vacuna con pure de papas, zapallo o mixto"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 630.doubleValue
			imagenes = #["/imagenes/lomo.jpg", "/imagenes/lomo.jpg", "/imagenes/lomo.jpg"]
		]
		plato7 = new ItemCarta => [
			titulo = "Pizza grande napolitana"
			descripcion = "Pizza de 8 porciones con salsa de tomate, queso muzzarella y rodajas de tomate"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 450.doubleValue
			imagenes = #["/imagenes/pizzaNapo.jpg", "/imagenes/pizzaNapo.jpg", "/imagenes/pizzaNapo.jpg"]
		]
		plato8 = new ItemCarta => [
			titulo = "Rabas a la provenzal"
			descripcion = "rabas a la provenzal con limon"
			categoria = Categoria.Entrada
			subCategoria = "Para compartir"
			precioUnitario = 600.doubleValue
			imagenes = #["/imagenes/rabas.jpg", "/imagenes/rabas.jpg", "/imagenes/rabas.jpg"]
		]
		plato9 = new ItemCarta => [
			titulo = "Papas fritas a la provenzal"
			descripcion = "Papas fritas a la provenzal con limon"
			categoria = Categoria.Entrada
			subCategoria = "Para compartir"
			precioUnitario = 200.doubleValue
			imagenes = #["/imagenes/papasFritas.jpg", "/imagenes/papasFritas.jpg", "/imagenes/papasFritas.jpg"]
		]
		plato10 = new ItemCarta => [
			titulo = "Coca Cola light"
			descripcion = "Bebida sabor cola sin azucar con gas"
			categoria = Categoria.Bebida
			subCategoria = "Gaseosas"
			precioUnitario = 100.doubleValue
			imagenes = #["/imagenes/cocaLight.jpg", "/imagenes/cocaLight.jpg", "/imagenes/cocaLight.jpg"]
		]
		plato11 = new ItemCarta => [
			titulo = "Ravioles con salsa bolognesa"
			descripcion = "Ravioles rellenos de carne con verduras con salsa de tomate y carne"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 350.doubleValue
			imagenes = #["/imagenes/ravioles.jpg", "/imagenes/ravioles.jpg", "/imagenes/ravioles.jpg"]
		]
		plato12 = new ItemCarta => [
			titulo = "Tallarines con salsa filleto"
			descripcion = "Fideos tipo tallarin con salsa de tomate suavemente condimentada"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 320.doubleValue
			imagenes = #["/imagenes/tallarines.jpg", "/imagenes/tallarines.jpg", "/imagenes/tallarines.jpg"]
		]
		plato13 = new ItemCarta => [
			titulo = "Mousse de chocolate"
			descripcion = "Suave mousse de chocolate con ralladura de chocolate blanco"
			categoria = Categoria.Postre
			subCategoria = "Cremas"
			precioUnitario = 200.doubleValue
			imagenes = #["/imagenes/mouse.jpg", "/imagenes/mouse.jpg", "/imagenes/mouse.jpg"]
		]
		plato14 = new ItemCarta => [
			titulo = "2 Bochas de heladas"
			descripcion = "2 bochas de gustos a elección (chocolate, crema americana, frutilla, dulce de leche)"
			categoria = Categoria.Postre
			subCategoria = "Helados"
			precioUnitario = 150.doubleValue
			imagenes = #["/imagenes/bochas.jpg", "/imagenes/bochas.jpg", "/imagenes/bochas.jpg"]
		]
		plato15 = new ItemCarta => [
			titulo = "Panqueque clasico con dulce de leche"
			descripcion = "Panqueque con dulce de leche repostero"
			categoria = Categoria.Postre
			subCategoria = "Panqueques"
			precioUnitario = 200.doubleValue
			imagenes = #["/imagenes/panqueque.jpg", "/imagenes/panqueque.jpg", "/imagenes/panqueque.jpg"]
		]
		plato16 = new ItemCarta => [
			titulo = "Cafe con crema"
			descripcion = "Cafe cubano con el mejor aroma y crema"
			categoria = Categoria.Cafeteria
			subCategoria = "Cafe"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["/imagenes/cafe1.jpg", "/imagenes/cafe1.jpg", "/imagenes/cafe1.jpg"]
		]
		plato17 = new ItemCarta => [
			titulo = "Café con licor"
			descripcion = "Café fuerte con un toque de licor de chocolate"
			categoria = Categoria.Cafeteria
			subCategoria = "Cafe"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["/imagenes/cafe2.jpg", "/imagenes/cafe2.jpg", "/imagenes/cafe2.jpg"]
		]
		plato18 = new ItemCarta => [
			titulo = "Vino añejo de la casa"
			descripcion = "Vino de 15 años, especialidad de la casa"
			categoria = Categoria.Bebida
			subCategoria = "Vinos"
			precioUnitario = 1500.doubleValue
			habilitado = true
			imagenes = #["/imagenes/vino.jpg", "/imagenes/vino.jpg", "/imagenes/vino.jpg"]
		]
		plato19 = new ItemCarta => [
			titulo = "Filet de merluza con ensalada"
			descripcion = "Filet de merluza rebozado con ensalada de lechuga y tomate"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pescados"
			precioUnitario = 350.doubleValue
			imagenes = #["/imagenes/filet.jpg", "/imagenes/filet.jpg", "/imagenes/filet.jpg"]
		]
		plato20 = new ItemCarta => [
			titulo = "Serranitos enrollados "
			descripcion = "Bocados deliciosos de pan de molde rellenas de lonchas de jamón, pimiento verde y pechuga"
			categoria = Categoria.Entrada
			subCategoria = "Picadas"
			precioUnitario = 360.doubleValue
			imagenes = #["/imagenes/serranitos.jpg", "/imagenes/serranitos.jpg", "/imagenes/serranitos.jpg"]
		]
		
		mesa1 = new Mesa => [numero = 1]
		mesa2 = new Mesa => [numero = 2]
		mesa3 = new Mesa => [numero = 3]
		mesa4 = new Mesa => [numero = 4]
		mesa5 = new Mesa => [numero = 5]
		mesa6 = new Mesa => [numero = 6]
		mesa7 = new Mesa => [numero = 7]
		mesa8 = new Mesa => [numero = 8]
		mesa9 = new Mesa => [numero = 9]
		mesa10 = new Mesa => [numero = 10]

		claudia = new Empleado => [
			nombreUsuario = "clauMorales"
			nombre = "Claudia"
			apellido = "Morales"
			contraseña = "1234"
			email = "javierdevoto96@gmail.com"
			tipoEmpleado = TipoEmpleado.Mozo
		]
		pepe = new Empleado => [
			nombreUsuario = "pepe"
			nombre = "Roberto"
			apellido = "Garcia"
			contraseña = "1234"
			email = "buffalautaro@gmail.com"
			tipoEmpleado = TipoEmpleado.Cocinero
		]
		
		monica = new Empleado => [
			nombreUsuario = "moniCorral"
			nombre = "Monica"
			apellido = "Corral"
			contraseña = "1234"
			email = "mcorral@yahoo.com"
			tipoEmpleado = TipoEmpleado.Mozo
		]
		
		jose = new Empleado => [
			nombreUsuario = "joseDueño"
			nombre = "Jose"
			apellido = "Dueño"
			contraseña = "4321"
			email = "eldueñodetodo@yahoo.com"
			tipoEmpleado = TipoEmpleado.Administrador
		]
		
		carta.create(plato1)
		carta.create(plato2)
		carta.create(plato3)
		carta.create(plato4)
		carta.create(plato5)
		carta.create(plato6)
		carta.create(plato7)
		carta.create(plato8)
		carta.create(plato9)
		carta.create(plato10)
		carta.create(plato11)
		carta.create(plato12)
		carta.create(plato13)
		carta.create(plato14)
		carta.create(plato15)
		carta.create(plato16)
		carta.create(plato17)
		carta.create(plato18)
		carta.create(plato19)
		carta.create(plato20)

		repoMesas.create(mesa1)
		repoMesas.create(mesa2)
		repoMesas.create(mesa3)
		repoMesas.create(mesa4)
		repoMesas.create(mesa5)
		repoMesas.create(mesa6)
		repoMesas.create(mesa7)
		repoMesas.create(mesa8)
		repoMesas.create(mesa9)
		repoMesas.create(mesa10)
		
		repoEmpleado.create(claudia)
		repoEmpleado.create(monica)
		repoEmpleado.create(pepe)
		repoEmpleado.create(jose)
	}
	
	def createPedido(ItemCarta itemCarta, int cantidad) {
		new Pedido => [
			it.itemCarta = itemCarta
			it.cantidad = cantidad
		]
	}

}
