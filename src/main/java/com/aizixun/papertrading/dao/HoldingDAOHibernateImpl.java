package com.aizixun.papertrading.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.User;

@Repository
public class HoldingDAOHibernateImpl implements HoldingDAO {

	private EntityManager entityManager;
	
	@Autowired
	public HoldingDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager; 
	}
	
	@Override
	public List<Holding> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Holding> holdingQuery = currentSession.createQuery("From Holding", Holding.class);
		List<Holding> holdingList = holdingQuery.getResultList();
		return holdingList;
	}

	@Override
	public Holding findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Holding holding = currentSession.get(Holding.class, id);
		return holding;
	}

	@Override
	public void save(Holding holding) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(holding); 
	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Holding> holdingQuery = currentSession.createQuery("delete from Holding where id=:holdingId");
		holdingQuery.setParameter("holdingId", id);
		holdingQuery.executeUpdate();
	}

}
