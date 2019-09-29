package com.aizixun.papertrading.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.aizixun.papertrading.entity.Order;
import com.aizixun.papertrading.entity.User;

@Repository
public class OrderDAOHibernateImpl implements OrderDAO {

	private EntityManager entityManager;
	
	@Autowired
	public OrderDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager; 
	}
	
	@Override
	public List<Order> findByUserId(int userId) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Order> orderQuery = currentSession.createQuery("FROM Order order WHERE order.userId =: userId", Order.class);
		orderQuery.setParameter("userId", userId);
		List<Order> orderList = orderQuery.getResultList();
		return orderList;
	}

}
