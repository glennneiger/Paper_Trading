package com.aizixun.papertrading.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.aizixun.papertrading.entity.Order;

@Repository
public class OrderDAOHibernateImpl implements OrderDAO {

	private EntityManager entityManager;
	
	@Autowired
	public OrderDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager; 
	}
	
	@Override 
	public Order findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Order order = currentSession.get(Order.class, id);
		return order;
	}
	
	@Override 
	public void save(Order order) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(order); 
	}
	
	@Override
	public List<Order> findByUserId(int userId) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Order> orderQuery = currentSession.createQuery("FROM Order order WHERE order.userId =: userId", Order.class);
		orderQuery.setParameter("userId", userId);
		List<Order> orderList = orderQuery.getResultList();
		return orderList;
	}
	
	@Override 
	public List<Order> findByStatus(String status) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<Order> orderQuery = currentSession.createQuery("FROM Order order WHERE order.statusType =: statusType", Order.class);
		orderQuery.setParameter("statusType", status);
		List<Order> orderList = orderQuery.getResultList();
		return orderList;
	}

}
