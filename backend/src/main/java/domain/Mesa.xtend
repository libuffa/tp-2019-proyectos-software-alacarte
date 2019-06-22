package domain

import com.fasterxml.jackson.annotation.JsonProperty
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import org.eclipse.xtend.lib.annotations.Accessors
import repository.SesionRepository

@Entity
@Accessors
class Mesa {

	@Id
	@GeneratedValue
	Long id
	
	@JsonProperty("habilitada")
	def getHabilitada() {
		val sesiones = SesionRepository.instance.searchWithMesa()
		val sesionesDeMesa = sesiones.filter[sesion | sesion.mesa.id == this.id]
		return sesionesDeMesa.filter[sesion | sesion.fechaBaja === null].size() == 0
	}
	
}
