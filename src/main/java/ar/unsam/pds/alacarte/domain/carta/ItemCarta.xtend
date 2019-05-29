package ar.unsam.pds.alacarte.domain.carta

import java.util.ArrayList
import java.util.List
import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import javax.persistence.Transient
import org.eclipse.xtend.lib.annotations.Accessors

@Entity
@Accessors
class ItemCarta {
	
	@Id
	@GeneratedValue
	Long id
	
	@Column(length=50)
	String titulo
	
	@Column(length=100)
	String descripcion
	
	@Column
	Long categoria
	
	@Transient
	List<String> imagesURLs= new ArrayList
	
}