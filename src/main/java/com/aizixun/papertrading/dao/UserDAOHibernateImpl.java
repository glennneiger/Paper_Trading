package com.aizixun.papertrading.dao;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.aizixun.papertrading.entity.User;

@Repository
public class UserDAOHibernateImpl implements UserDAO {
	
	private EntityManager entityManager;
	
	@Autowired
	public UserDAOHibernateImpl(EntityManager entityManager) {
		this.entityManager = entityManager; 
	}

	@Override
	public List<User> findAll() {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("FROM User", User.class);
		List<User> userList = userQuery.getResultList();
		return userList;
	}

	@Override
	public User findById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		User user = currentSession.get(User.class, id);
		return user;
	}

	@Override
	public List<User> findByUserName(String userName) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("FROM User user WHERE user.userName =: userName", User.class);
		userQuery.setParameter("userName", userName);
		List<User> userList = userQuery.getResultList();
		return userList;
	}
	
	@Override
	public List<User> findByUserEmail(String userEmail) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("FROM User user WHERE user.userEmail =: userEmail", User.class);
		userQuery.setParameter("userEmail", userEmail);
		List<User> userList = userQuery.getResultList();
		return userList;
	}
	
	@Override
	public void save(User user) {
		Session currentSession = entityManager.unwrap(Session.class);
		currentSession.saveOrUpdate(user);  
	}

	@Override
	public void deleteById(int id) {
		Session currentSession = entityManager.unwrap(Session.class);
		Query<User> userQuery = currentSession.createQuery("delete from User where id=:userId", User.class);
		userQuery.setParameter("userId", id);
		userQuery.executeUpdate();
	}

}
