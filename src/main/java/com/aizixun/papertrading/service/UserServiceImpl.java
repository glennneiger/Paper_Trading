package com.aizixun.papertrading.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aizixun.papertrading.dao.UserDAO;
import com.aizixun.papertrading.entity.User;

@Service
public class UserServiceImpl implements UserService {
	
	private final String RESPONSE_SUCCESS = "success";
	private final String RESPONSE_ID = "id"; 
	private final String RESPONSE_FIRST_NAME = "first_name";
	private final String RESPONSE_LAST_NAME = "last_name";
	private final String RESPONSE_TOKEN = "token"; 
	
	private final Double DEFAULT_CASH = 1000000.0;
	
	private UserDAO userDAO;
	private JwtTokenService jwtTokenService; 
	
	@Autowired
	public UserServiceImpl(UserDAO userDAO, JwtTokenService jwtTokenService) {
		this.userDAO = userDAO; 
		this.jwtTokenService = jwtTokenService; 
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
	public boolean userEmailExist(String userEmail) {
		List<User> userList = userDAO.findByUserEmail(userEmail);
		if (userList.size() == 1) return true; 
		return false; 
	}
	
	private User checkUserPassword(String userEmail, String userPassword) {
		List<User> userList = userDAO.findByUserEmail(userEmail);
		if (userList.size() != 1) return null;
		User user = userList.get(0);
		if (user.getUserPassword().equals(userPassword)) return user; 
		return null;
	}
	
	@Override
	@Transactional
	public Map<String, Object> userSignIn(String userEmail, String userPassword) {	
		Map<String, Object> response = new HashMap<String, Object>();
		User user = checkUserPassword(userEmail, userPassword); 
		if (user == null) {
			response.put(RESPONSE_SUCCESS, false);
			return response; 
		}
		else {
			response.put(RESPONSE_SUCCESS, true);
			response.put(RESPONSE_ID, user.getId());
			response.put(RESPONSE_FIRST_NAME, user.getUserFirstName());
			response.put(RESPONSE_LAST_NAME, user.getUserLastName());
			response.put(RESPONSE_TOKEN, jwtTokenService.generateToken(user));
			return response; 
		}
	}

	
	private Timestamp getCurrentTimestamp() {
		Instant now = Instant.now();
		Timestamp curent = Timestamp.from(now);
		return curent;
	}
	
	@Override
	@Transactional
	public Map<String, Object> userSignUp(String userFirstName, String userLastName, String userEmail, String userPassword) {
		// TODO - Validating all input fields
		
		Map<String, Object> response = new HashMap<String, Object>();
		
		if (userEmailExist(userEmail)) {
			response.put(RESPONSE_SUCCESS, false);
			return response; 
		}
		
		User user = new User(userFirstName, userLastName, userPassword, userEmail, DEFAULT_CASH, getCurrentTimestamp());
		userDAO.save(user);
		response.put(RESPONSE_ID, user.getId());
		response.put(RESPONSE_FIRST_NAME, user.getUserFirstName());
		response.put(RESPONSE_LAST_NAME, user.getUserLastName());
		response.put(RESPONSE_TOKEN, jwtTokenService.generateToken(user));
		
		return response;
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
