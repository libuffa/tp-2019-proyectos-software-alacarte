package repository

import domain.Categoria
import domain.ItemCarta
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.JoinType
import javax.persistence.criteria.Root
import org.eclipse.xtend.lib.annotations.Accessors

@Accessors
class ItemCartaRepository extends AbstractRepository<ItemCarta> {

	static ItemCartaRepository instance

	private new() {
	}

	def static getInstance() {
		if (instance === null) {
			instance = new ItemCartaRepository
		} else {
			instance
		}
	}

	override getEntityType() {
		ItemCarta
	}

	override generateWhere(CriteriaBuilder criteria, CriteriaQuery<ItemCarta> query, Root<ItemCarta> campos,
		ItemCarta t) {
		if (t.titulo !== null) {
            query.where(criteria.equal(campos.get("titulo"), t.titulo))
        }
	}

	override searchById(long _id) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposItemCarta = query.from(entityType)
			camposItemCarta.fetch("imagenes", JoinType.LEFT)
			query.select(camposItemCarta)
			query.where(criteria.equal(camposItemCarta.get("id"), _id))
			entityManager.createQuery(query).singleResult
		} finally {
			entityManager?.close
		}
	}
	
	def searchByCategoria(Categoria categoria) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val camposItemCarta = query.from(entityType)
			camposItemCarta.fetch("imagenes", JoinType.LEFT)
			query.select(camposItemCarta)
			query.where(criteria.equal(camposItemCarta.get("categoria"), categoria))
			entityManager.createQuery(query).resultList
		} finally {
			entityManager?.close
		}
	}

}
