package controller

import domain.Categoria
import domain.ItemCarta
import java.io.File
import java.util.List
import org.apache.commons.fileupload.FileItem
import org.apache.commons.fileupload.disk.DiskFileItemFactory
import org.apache.commons.fileupload.servlet.ServletFileUpload
import org.apache.commons.fileupload.servlet.ServletRequestContext
import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.api.annotation.Put
import org.uqbar.xtrest.json.JSONUtils
import repository.ItemCartaRepository

@Controller
@Accessors
class CartaController {

	extension JSONUtils = new JSONUtils
	ItemCartaRepository carta = ItemCartaRepository.instance
	final static String UPLOAD_DIRECTORY = '$HOME/' 

	@Get("/carta/:categoria")
	def Result obtenerCarta() {
		try {
			val _categoria = Categoria.valueOf(categoria)
			val items = carta.searchByCategoria(_categoria)
			return ok(items.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/carta/obtenerCategorias")
	def Result obtenerCategorias() {
		try {
			return ok(Categoria.values.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Get("/carta/:id/obtenerPlato")
	def Result obteberPlato() {
		var platoSolicitado = carta.searchById(new Long(id))
		try {
			return ok(platoSolicitado.toJson)
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/:id/cambiarEstadoPlato")
	def Result cambiarEstadoPlato() {
		var platoAModificar = carta.searchById(new Long(id))
		try {
			platoAModificar.cambiarEstado()
			carta.update(platoAModificar)
			return ok("True")
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Put("/carta/crearPlato")
	def Result crearPlato(@Body String body) {
		var nuevoPlato = body.fromJson(ItemCarta)
		try {
			carta.create(nuevoPlato)
			return ok()
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/:id/modificarPlato")
	def Result modificarPlato(@Body String body) {
		var platoModificado = body.fromJson(ItemCarta)
		try {
			carta.update(platoModificado)
			return ok()
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Put("/carta/:id/eliminarPlato")
	def Result eliminarPlato() {
		var platoAEliminar = carta.searchById(new Long(id))
		try {
			carta.delete(platoAEliminar)
			return ok()
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

	@Post("/carta/agregarItemCarta")
	def Result agregarItemCarta(@Body String body) {

		if (ServletFileUpload.isMultipartContent(request)) {
			try {
				System.out.println("inTry");
				val factory = new DiskFileItemFactory()
				factory.setSizeThreshold(100000);
				val servletFIleUpload = new ServletFileUpload(factory)
				
				val List<FileItem> multiparts = servletFIleUpload. parseRequest(request);
				System.out.println("antes del ciclo");
				for (FileItem item : multiparts) {
					System.out.println("entra al ciclo");
					if (!item.isFormField()) {
						System.out.println("entra al if");
						val String name = new File(item.getName()).getName();
						item.write(new File(UPLOAD_DIRECTORY + File.separator + name));
						println(item)
					}
				}

				// File uploaded successfully
				ok('{ "status" : "OK" }');

			} catch (Exception e) {
				response.getWriter().println("File Upload Failed due to " + e);
				badRequest(e.message)
			}

		} else {
			response.getWriter().println("Sorry this Servlet only handles file upload request");
			request.setAttribute("message", "Sorry this Servlet only handles file upload request");
			badRequest("No hay cosas para subir")
		}

//		val data = body.getPropertyValue("data")
//
//		val idItemCarta = Long.valueOf(body.getPropertyValue("id"))
//		val titulo = String.valueOf(body.getPropertyValue("titulo"))
//		val descripcion = String.valueOf(body.getPropertyValue("descripcion"))
//		val categoria = Categoria.valueOf(body.getPropertyValue("categoria"))
//		val subcategoria = String.valueOf(body.getPropertyValue("subcategoria"))
//		val precioUnitario = Double.valueOf(body.getPropertyValue("precioUnitario"))
//		val imagenes = body.getPropertyValue("imagenes")
//
//		try {
//
//			var ItemCarta itemCarta
//
//			if (idItemCarta !== null) {
//				itemCarta = new ItemCarta => [
//					it.id = idItemCarta
//					it.titulo = titulo
//					it.descripcion = descripcion
//					it.categoria = categoria
//					it.subCategoria = subcategoria
//					it.precioUnitario = precioUnitario
//				]
//				carta.update(itemCarta)
//			} else {
//				itemCarta = new ItemCarta => [
//					it.titulo = titulo
//					it.descripcion = descripcion
//					it.categoria = categoria
//					it.subCategoria = subcategoria
//					it.precioUnitario = precioUnitario
//				]
//				carta.create(itemCarta)
//			}
//
//			if (itemCarta === null) {
//				return ok('{ "error" : "hubo un error en el servicio" }')
//			}
//
//			return ok("ok")
//		} catch (Exception e) {
//			badRequest(e.message)
//		}
	}
	
	@Post("/carta/eliminarItemCarta")
	def Result eliminarItemCarta(@Body String body) {

		val idItemCarta = Long.valueOf(body.getPropertyValue("id"))

		try {

			if (idItemCarta === null) {
				return ok('{ "error" : "no existe el item de carta" }')
			}

			val itemCarta = carta.searchById(idItemCarta)
			
			carta.delete(itemCarta)			

			return ok("ok")
		} catch (Exception e) {
			badRequest(e.message)
		}
	}

}
