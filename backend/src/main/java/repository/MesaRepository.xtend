package repository

import domain.Mesa
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root

class MesaRepository extends AbstractRepository<Mesa> {
	
	static MesaRepository instance

	private new() {
	}

	def static getInstance() {
		if (instance === null) {
			instance = new MesaRepository
		} else {
			instance
		}
	}
	
	override getEntityType() {
		Mesa
	}
	
	override generateWhere(CriteriaBuilder criteria, CriteriaQuery<Mesa> query, Root<Mesa> campos, Mesa t) {
		throw new UnsupportedOperationException("TODO: auto-generated method stub")
	}
	
	override searchById(long _id) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposMesa = query.from(entityType)
			query.select(camposMesa)
			query.where(criteria.equal(camposMesa.get("id"), _id))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}
	
	override searchExampleById(Mesa mesa) {
		val id = mesa.id
		searchById(id)
	}
	
	
}