package com.aizixun.papertrading.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aizixun.papertrading.dao.UserDAO;
import com.aizixun.papertrading.entity.User;

@Service
public class UserServiceImpl implements UserService {
	
	private UserDAO userDAO;
	
	@Autowired
	public UserServiceImpl(UserDAO userDAO) {
		this.userDAO = userDAO; 
	}

	@Override
	@Transactional
	public List<User> findAll() {
		return userDAO.findAll();
	}

	@Override
	@Transactional
	public User findById(int id) {
		return userDAO.findById(id);
	}
	
	@Override
	@Transactional
	public boolean userNameExist(String userName) {
		List<User> userList = userDAO.findByUserName(userName);
		if (userList.size() == 1) return true; 
		return false; 
	}

	@Override
	@Transactional
	public void save(User user) {
		userDAO.save(user);
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		userDAO.deleteById(id);
	}

}