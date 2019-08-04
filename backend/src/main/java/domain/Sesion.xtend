package domain

import com.fasterxml.jackson.annotation.JsonIgnore
import com.fasterxml.jackson.annotation.JsonProperty
import domain.empleado.Empleado
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.ArrayList
import java.util.List
import javax.persistence.CascadeType
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.OneToMany
import javax.persistence.OneToOne
import org.eclipse.xtend.lib.annotations.Accessors
import repository.SesionRepository

@Entity
@Accessors
class Sesion {

	@Id
	@GeneratedValue
	Long id

	@OneToMany(fetch=FetchType.EAGER, cascade=CascadeType.ALL)
	List<Pedido> pedidos = new ArrayList

	@OneToOne(fetch=FetchType.LAZY)
	@JsonIgnore Mesa mesa

	@OneToOne(fetch=FetchType.LAZY)
	@JsonIgnore Empleado mozo
	
	@Column
	Long idMozo

	@Column
	Long idMesa

	@Column
	Boolean pideCuenta = false

	@Column
	Boolean juegaPorPremio = true
	
	@Column
	Boolean ganoPremio = false
	
	@Column
	Boolean llamarMozo = false
	
	@Column
	@JsonIgnore LocalDateTime fechaAlta

	@Column
	@JsonIgnore LocalDateTime fechaBaja = null

	new() {
		fechaAlta = LocalDateTime.now
	}
	
	def solicitarMozo() {
		this.llamarMozo = !this.llamarMozo
		SesionRepository.instance.update(this)
	}

	def pedirItem(ItemCarta itemCarta, Integer cantidad, String comentarios, Boolean premio) {
		val pedido = new Pedido => [
			it.itemCarta = itemCarta
			it.cantidad = cantidad
			it.comentarios = comentarios
			it.premio = premio
			it.estado = Estado.Creado
		]
		if(premio){
			this.ganoPremio = false
		}
		this.pedidos.add(pedido)
		SesionRepository.instance.update(this)
	}
	
	def void jugar() {
		this.juegaPorPremio = false
		SesionRepository.instance.update(this)
	}
	
	def void ganarPremio() {
		this.ganoPremio = !this.ganoPremio
		SesionRepository.instance.update(this)
	}

	def cambiarEstado(Long idPedido) {
		pedidos.findFirst[pedido|pedido.id.equals(idPedido)].siguienteEstado
		SesionRepository.instance.update(this)
	}

	def contienePedido(Long id) {
		pedidos.exists[pedido|pedido.id.equals(id)]
	}

	def bajaPedido(Long idPedido) {
		val pedido = pedidos.findFirst[pedido|pedido.id.equals(idPedido)]
		pedido.estado = Estado.Cancelado
		pedido.cancelado = true
		SesionRepository.instance.update(this)
	}

	@JsonIgnore
	def getPedidosActivos() {
		pedidos.filter[pedido|!pedido.cancelado].toList
	}

	@JsonIgnore
	def getPedido(Long id) {
		this.pedidos.findFirst[pedido|pedido.id.equals(id)]
	}

	def pedirCuenta() {
		this.pideCuenta = !this.pideCuenta
		SesionRepository.instance.update(this)
	}
	
	def cerrarSesion() {
		fechaBaja = LocalDateTime.now
		SesionRepository.instance.update(this)
	}
	
	def sesionActiva() {
		fechaBaja === null
	}

	@JsonProperty("fechaAlta")
	def getFechaAltaAsString() {
		getFechaHora(this.fechaAlta)
	}

	@JsonProperty("fechaBaja")
	def getFechaBajaAsString() {
		if (this.fechaBaja !== null) {
			getFechaHora(this.fechaBaja)
		} else {
			null
		}
	}

	def getFechaHora(LocalDateTime fechaHora) {
		val formatterDateTime = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")
		formatterDateTime.format(fechaHora)
	}

}
