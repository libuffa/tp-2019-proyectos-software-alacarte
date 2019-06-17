package repository

import domain.empleado.Empleado
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root
import domain.empleado.Mozo

class EmpleadoRepository extends AbstractRepository<Empleado> {
	
	static EmpleadoRepository instance

	private new() {
	}

	def static getInstance() {
		if (instance === null) {
			instance = new EmpleadoRepository
		} else {
			instance
		}
	}
	
	override getEntityType() {
		Empleado
	}
	
	override generateWhere(CriteriaBuilder criteria, CriteriaQuery<Empleado> query, Root<Empleado> campos, Empleado t) {
		if (t.nombreUsuario !== null) {
            query.where(criteria.equal(campos.get("nombreUsuario"), t.nombreUsuario))
        }
	}
	
	override searchById(long _id) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposEmpleado = query.from(entityType)
//			camposItemCarta.fetch("imagenes", JoinType.LEFT)
			query.select(camposEmpleado)
			query.where(criteria.equal(camposEmpleado.get("id"), _id))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}
	
	override searchExampleById(Empleado empl) {
		val id = empl.id
		searchById(id)
	}
	
	def searchMozoById(long _id) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(Mozo)
			val camposEmpleado = query.from(Mozo)
//			camposItemCarta.fetch("imagenes", JoinType.LEFT)
			query.select(camposEmpleado)
			query.where(criteria.equal(camposEmpleado.get("id"), _id))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}
	
	def searchMozoExampleById(Mozo empl) {
		val id = empl.id
		searchMozoById(id)
	}
	
	def searchByString(String nombreUsuario) {
		val entityManager = generateEntityManager
        try {
            val criteria = entityManager.criteriaBuilder
            val query = criteria.createQuery(entityType)
            val camposUsuario = query.from(entityType)
            query.select(camposUsuario)
            query.where(criteria.equal(camposUsuario.get("nombreUsuario"), nombreUsuario))
            entityManager.createQuery(query).singleResult
        } finally {
            entityManager?.close
        }
	}
	
}