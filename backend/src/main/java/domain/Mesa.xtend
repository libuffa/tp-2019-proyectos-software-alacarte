package domain

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.Id
import org.eclipse.xtend.lib.annotations.Accessors

@Entity
@Accessors
class Mesa {

	@Id
	@GeneratedValue
	Long id

}
