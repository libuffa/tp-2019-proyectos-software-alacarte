package ar.unsam.pds.alacarte.repository

import ar.unsam.pds.alacarte.domain.carta.ItemCarta
import java.util.ArrayList
import java.util.List
import org.eclipse.xtend.lib.annotations.Accessors
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root

@Accessors
class Carta extends AbstractRepo<ItemCarta> {

	static final Long ENTRADA = new Long(1)
	@Accessors static final Long PLATO_PRINCIPAL = new Long(2)
	static final Long POSTRE = new Long(3)
	static final Long BEBIDA = new Long(4)

	static Carta instance

	private new() {
	}

	def static getInstance() {
		if (instance === null) {
			instance = new Carta
		} else {
			instance
		}
	}

	override getEntityType() {
		ItemCarta
	}

	override generateWhere(CriteriaBuilder criteria, CriteriaQuery<ItemCarta> query, Root<ItemCarta> campos,
		ItemCarta t) {
		throw new UnsupportedOperationException("TODO: auto-generated method stub")
	}

	override searchById(long _id) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposItemCarta = query.from(entityType)
//			camposUsuario.fetch("amigos", JoinType.LEFT)
//			camposUsuario.fetch("entradas", JoinType.LEFT)
			query.select(camposItemCarta)
			query.where(criteria.equal(camposItemCarta.get("id"), _id))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}

}
