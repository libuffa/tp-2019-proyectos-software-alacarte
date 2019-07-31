package repository

import domain.Sesion
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root
import org.eclipse.xtend.lib.annotations.Accessors
import javax.persistence.criteria.JoinType

@Accessors
class SesionRepository extends AbstractRepository<Sesion> {
	
	static SesionRepository instance

	private new() {
	}

	def static getInstance() {
		if (instance === null) {
			instance = new SesionRepository
		} else {
			instance
		}
	}
	
	override getEntityType() {
		Sesion
	}
	
	override generateWhere(CriteriaBuilder criteria, CriteriaQuery<Sesion> query, Root<Sesion> campos, Sesion t) {
		if (t.mesa !== null) {
            query.where(criteria.equal(campos.get("mesa"), t.mesa))
        }
	}
	
	override searchById(long _id) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposSesion = query.from(entityType)
			camposSesion.fetch("pedidos", JoinType.LEFT)
			query.select(camposSesion)
			query.where(criteria.equal(camposSesion.get("id"), _id))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}
	
	def searchWithMesa() {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val from = query.from(entityType)
			from.fetch("mesa", JoinType.LEFT)
			query.select(from)
			entityManager.createQuery(query).resultList
		} finally {
			entityManager?.close
		}
	}
	
	override searchExampleById(Sesion sesion) {
		val id = sesion.id
		searchById(id)
	}
	
	def searchSesionByPedido(Long id) {
		val sesiones = this.allInstances
		val sesion = sesiones.findFirst[ sesion | sesion.contienePedido(id)]
		sesion
	}
	
	def searchByIdMozo(Long idMozo) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposSesion = query.from(entityType)
			query.select(camposSesion)
			query.where(criteria.equal(camposSesion.get("idMozo"), idMozo))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}
}