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
			imagenes = #["https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16556-marinated-antipasto-platter-600x600.jpg?ext=.jpg","https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16556-marinated-antipasto-platter-600x600.jpg?ext=.jpg","https://www.landolakes.com/RecipeManagementSystem/media/Recipe-Media-Files/Recipes/Retail/x17/16556-marinated-antipasto-platter-600x600.jpg?ext=.jpg"]
			habilitado = true
		]
		plato2 = new ItemCarta => [
			titulo = "Milanesa de ternera con papas fritas"
			descripcion = "Lomo empanado con papas al aceite"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 520.doubleValue
			habilitado = true
			imagenes = #["https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg","https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg","https://www.viajejet.com/wp-content/viajes/Milanesa-con-papas-fritas.jpg"]
		]
		plato3 = new ItemCarta => [
			titulo = "Pizza grande de muzzarella"
			descripcion = "Pizza de 8 porciones con salsa de tomate y queso muzzarella"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 350.doubleValue
			habilitado = true
			imagenes = #["https://www.closetcooking.com/wp-content/uploads/2008/06/Shrimp-Scampi-Pizza-1200-3859.jpg","https://www.closetcooking.com/wp-content/uploads/2008/06/Shrimp-Scampi-Pizza-1200-3859.jpg","https://www.closetcooking.com/wp-content/uploads/2008/06/Shrimp-Scampi-Pizza-1200-3859.jpg"]
		]
		plato4 = new ItemCarta => [
			titulo = "Coca Cola Regular"
			descripcion = "Bebida sabor cola con gas"
			categoria = Categoria.Bebida
			subCategoria = "Gaseosas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://images-na.ssl-images-amazon.com/images/I/5156FefjlqL._SX425_.jpg"]
		]
		plato5 = new ItemCarta => [
			titulo = "Asado"
			descripcion = "Mix con 4 tipos de carnes cocidas al mejor punto"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 400.doubleValue
			habilitado = true
			imagenes = #["http://www.primeranota.cl/web/wp-content/uploads/2018/10/asado-de-tira-1024x682.jpg"]
		]
		plato6 = new ItemCarta => [
			titulo = "Lomo con pure"
			descripcion = "Lomo de carne vacuna con pure de papas, zapallo o mixto"
			categoria = Categoria.Plato_Principal
			subCategoria = "Carnes"
			precioUnitario = 630.doubleValue
			habilitado = true
			imagenes = #["https://2.bp.blogspot.com/-6j9KmOdpaFM/Tg4Ev26mO7I/AAAAAAAACbs/6OASavNaJbk/s1600/DSC07094.JPG","https://2.bp.blogspot.com/-6j9KmOdpaFM/Tg4Ev26mO7I/AAAAAAAACbs/6OASavNaJbk/s1600/DSC07094.JPG","https://2.bp.blogspot.com/-6j9KmOdpaFM/Tg4Ev26mO7I/AAAAAAAACbs/6OASavNaJbk/s1600/DSC07094.JPG"]
		]
		plato7 = new ItemCarta => [
			titulo = "Pizza grande a la napolitana"
			descripcion = "Pizza de 8 porciones con salsa de tomate, queso muzzarella y rodajas de tomate"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pizzas"
			precioUnitario = 450.doubleValue
			habilitado = true
			imagenes = #["https://i0.wp.com/locosxlapizza.com/wp-content/uploads/2015/02/receta-pizza-napolitana-original-locosxlapizza.jpg?fit=650%2C382","https://i0.wp.com/locosxlapizza.com/wp-content/uploads/2015/02/receta-pizza-napolitana-original-locosxlapizza.jpg?fit=650%2C382", "https://i0.wp.com/locosxlapizza.com/wp-content/uploads/2015/02/receta-pizza-napolitana-original-locosxlapizza.jpg?fit=650%2C382"]
		]
		plato8 = new ItemCarta => [
			titulo = "Rabas a la provenzal"
			descripcion = "rabas a la provenzal con limon"
			categoria = Categoria.Entrada
			subCategoria = "Para Compartir"
			precioUnitario = 600.doubleValue
			habilitado = true
			imagenes = #["http://www.utimujer.com/wp-content/uploads/2014/07/2003-09-17_Goose_bumps13.jpg", "http://www.utimujer.com/wp-content/uploads/2014/07/2003-09-17_Goose_bumps13.jpg", "http://www.utimujer.com/wp-content/uploads/2014/07/2003-09-17_Goose_bumps13.jpg"]
		]
		plato9 = new ItemCarta => [
			titulo = "Papas fritas a la provenzal"
			descripcion = "Papas fritas a la provenzal con limon"
			categoria = Categoria.Entrada
			subCategoria = "Para Compartir"
			precioUnitario = 200.doubleValue
			habilitado = true
			imagenes = #["https://i.pinimg.com/originals/1f/d7/e7/1fd7e7860291f6419ee94417a5b0c3ed.jpg","https://i.pinimg.com/originals/1f/d7/e7/1fd7e7860291f6419ee94417a5b0c3ed.jpg","https://i.pinimg.com/originals/1f/d7/e7/1fd7e7860291f6419ee94417a5b0c3ed.jpg"]
		]
		plato10 = new ItemCarta => [
			titulo = "Coca Cola light"
			descripcion = "Bebida sabor cola sin azucar con gas"
			categoria = Categoria.Bebida
			subCategoria = "Gaseosas"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://http2.mlstatic.com/coca-cola-light-15-zona-norte-D_NQ_NP_804517-MLA29578679830_032019-Q.jpg", "https://http2.mlstatic.com/coca-cola-light-15-zona-norte-D_NQ_NP_804517-MLA29578679830_032019-Q.jpg", "https://http2.mlstatic.com/coca-cola-light-15-zona-norte-D_NQ_NP_804517-MLA29578679830_032019-Q.jpg"]
		]
		plato11 = new ItemCarta => [
			titulo = "Ravioles con salsa bolognesa"
			descripcion = "Ravioles rellenos de carne con verduras con salsa de tomate y carne"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 350.doubleValue
			habilitado = true
			imagenes = #["https://cordobatimes.com/showup/wp-content/uploads/2014/08/18-10-www.cocinatipo.com-Lasa%C3%B1a-de-ravioles-y-zuchini.jpg","https://cordobatimes.com/showup/wp-content/uploads/2014/08/18-10-www.cocinatipo.com-Lasa%C3%B1a-de-ravioles-y-zuchini.jpg","https://cordobatimes.com/showup/wp-content/uploads/2014/08/18-10-www.cocinatipo.com-Lasa%C3%B1a-de-ravioles-y-zuchini.jpg"]
		]
		plato12 = new ItemCarta => [
			titulo = "Tallarines con salsa filleto"
			descripcion = "Fideos tipo tallarin con salsa de tomate suavemente condimentada"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pastas"
			precioUnitario = 320.doubleValue
			habilitado = true
			imagenes = #["https://www.organicbuyersgroup.com.au/shop/images/categories/pasta%20with%20sauce.jpg", "https://www.organicbuyersgroup.com.au/shop/images/categories/pasta%20with%20sauce.jpg","https://www.organicbuyersgroup.com.au/shop/images/categories/pasta%20with%20sauce.jpg"]
		]
		plato13 = new ItemCarta => [
			titulo = "Mousse de chocolate"
			descripcion = "Suave mouse de chocolate con ralladura de chocolate blanco"
			categoria = Categoria.Postre
			subCategoria = "Cremas"
			precioUnitario = 200.doubleValue
			habilitado = true
			imagenes = #["https://www.recipetineats.com/wp-content/uploads/2018/09/Chocolate-Mousse_9.jpg", "https://www.recipetineats.com/wp-content/uploads/2018/09/Chocolate-Mousse_9.jpg", "https://www.recipetineats.com/wp-content/uploads/2018/09/Chocolate-Mousse_9.jpg"]
		]
		plato14 = new ItemCarta => [
			titulo = "2 Bochas de heladas"
			descripcion = "2 bolas de los mejores gustos seleccionados de helado"
			categoria = Categoria.Postre
			subCategoria = "Helados"
			precioUnitario = 150.doubleValue
			habilitado = true
			imagenes = #["https://beermagazine.net/wp-content/uploads/2019/01/Como-hacer-helado-de-cerveza.jpg","https://beermagazine.net/wp-content/uploads/2019/01/Como-hacer-helado-de-cerveza.jpg","https://beermagazine.net/wp-content/uploads/2019/01/Como-hacer-helado-de-cerveza.jpg"]
		]
		plato15 = new ItemCarta => [
			titulo = "Panqueque clasico con dulce de leche"
			descripcion = "Panqueque con dulce de leche repostero"
			categoria = Categoria.Postre
			subCategoria = "Panqueques"
			precioUnitario = 200.doubleValue
			habilitado = true
			imagenes = #["https://www.casafe.org/wp-content/uploads/2017/10/encabezado-receta-panqueques.jpg","https://www.casafe.org/wp-content/uploads/2017/10/encabezado-receta-panqueques.jpg","https://www.casafe.org/wp-content/uploads/2017/10/encabezado-receta-panqueques.jpg"]
		]
		plato16 = new ItemCarta => [
			titulo = "Cafe con crema"
			descripcion = "Cafe cubano con el mejor aroma y crema"
			categoria = Categoria.Cafeteria
			subCategoria = "Cafe"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://previews.123rf.com/images/serezniy/serezniy1302/serezniy130205710/18042837-taza-de-caf%C3%A9-crema-batida-en-la-mesa-de-madera-de-cerca.jpg","https://previews.123rf.com/images/serezniy/serezniy1302/serezniy130205710/18042837-taza-de-caf%C3%A9-crema-batida-en-la-mesa-de-madera-de-cerca.jpg"]
		]
		plato17 = new ItemCarta => [
			titulo = "Cafe con licor"
			descripcion = "Cafe fuerte con un toque de licor de chocolate"
			categoria = Categoria.Cafeteria
			subCategoria = "Cafe"
			precioUnitario = 100.doubleValue
			habilitado = true
			imagenes = #["https://img.blogs.es/phillips/wp-content/uploads/2013/10/cafe_irlandes.jpg","https://img.blogs.es/phillips/wp-content/uploads/2013/10/cafe_irlandes.jpg","https://img.blogs.es/phillips/wp-content/uploads/2013/10/cafe_irlandes.jpg"]
		]
		plato18 = new ItemCarta => [
			titulo = "Vino añejo de la casa"
			descripcion = "Vino de 15 años, especialidad de la casa"
			categoria = Categoria.Bebida
			subCategoria = "Vinos"
			precioUnitario = 1500.doubleValue
			habilitado = true
			imagenes = #["https://cdn.shopify.com/s/files/1/0005/4634/0925/products/milpiedras-malbec_2048x2048.jpg?v=1557844325","https://cdn.shopify.com/s/files/1/0005/4634/0925/products/milpiedras-malbec_2048x2048.jpg?v=1557844325","https://cdn.shopify.com/s/files/1/0005/4634/0925/products/milpiedras-malbec_2048x2048.jpg?v=1557844325"]
		]
		plato19 = new ItemCarta => [
			titulo = "Filet de merluza con ensalada"
			descripcion = "Filet de merluza rebozado con ensalada de lechuga y tomate"
			categoria = Categoria.Plato_Principal
			subCategoria = "Pescados"
			precioUnitario = 350.doubleValue
			habilitado = true
			imagenes = #["https://bucket.glanacion.com/anexos/fotos/19/1682019.jpg","https://bucket.glanacion.com/anexos/fotos/19/1682019.jpg","https://bucket.glanacion.com/anexos/fotos/19/1682019.jpg"]
		]
		plato20 = new ItemCarta => [
			titulo = "Serranitos enrollados "
			descripcion = "Bocados deliciosos de pan de molde rellenas de lonchas de jamón, pimiento verde y pechuga"
			categoria = Categoria.Entrada
			subCategoria = "Picadas"
			precioUnitario = 360.doubleValue
			habilitado = true
			imagenes = #["//estag.fimagenes.com/img/1/2/f/J/h/2fJh_900.jpg","//estag.fimagenes.com/img/1/2/f/J/h/2fJh_900.jpg","//estag.fimagenes.com/img/1/2/f/J/h/2fJh_900.jpg"]
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
			email = "cmorales@yahoo.com"
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
