package repository

import java.util.List
import javax.persistence.EntityManagerFactory
import javax.persistence.Persistence
import javax.persistence.PersistenceException
import javax.persistence.criteria.CriteriaBuilder
import javax.persistence.criteria.CriteriaQuery
import javax.persistence.criteria.Root

abstract class AbstractRepository<T> {
	
	static final EntityManagerFactory entityManagerFactory = Persistence.createEntityManagerFactory("ALaCarte")
	
	def List<T> allInstances() {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val from = query.from(entityType)
			query.select(from)
			entityManager.createQuery(query).resultList
		} finally {
			entityManager?.close
		}
	}
	
	abstract def Class<T> getEntityType()

	def searchByExample(T t) {
		val entityManager = generateEntityManager
		try {
			val criteria = entityManager.criteriaBuilder
			val query = criteria.createQuery(entityType)
			val from = query.from(entityType)
			query.select(from)
			generateWhere(criteria, query, from, t)
			entityManager.createQuery(query).resultList
		} finally {
			entityManager?.close
		}
	}
	
	abstract def void generateWhere(CriteriaBuilder criteria, CriteriaQuery<T> query, Root<T> campos,T t)
	
	def create(T t) {
		val entityManager = generateEntityManager
		try {
			entityManager => [
				transaction.begin
				persist(t)
				transaction.commit
			]
		} catch (PersistenceException e) {
			e.printStackTrace
			entityManager.transaction.rollback
			throw new RuntimeException("Ocurrió un error, la operación no puede completarse", e)
		} finally {
			entityManager?.close
		}
	}

	def update(T t) {
		val entityManager = generateEntityManager
		try {
			entityManager => [
				transaction.begin
				merge(t)
				transaction.commit
			]
		} catch (PersistenceException e) {
			e.printStackTrace
			entityManager.transaction.rollback
			throw new RuntimeException("Ocurrió un error, la operación no puede completarse", e)
		} finally {
			entityManager?.close
		}
	}
	
	def delete(T t){
		val entityManager = generateEntityManager
		try {
			entityManager.transaction.begin
			if(entityManager.contains(t)){
				entityManager.remove(t)
			} else {
				entityManager.remove(entityManager.merge(t))
			}
			entityManager.transaction.commit
		} catch (PersistenceException e) {
			e.printStackTrace
			entityManager.transaction.rollback
			throw new RuntimeException("Ocurrió un error, la operación no puede completarse", e)
		} finally {
			entityManager?.close
		}
	}

	def generateEntityManager() {
		entityManagerFactory.createEntityManager
	}
	
	abstract def T searchById(long _id)
	
}