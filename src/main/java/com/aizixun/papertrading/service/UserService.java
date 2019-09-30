package com.aizixun.papertrading.service;

import java.util.List;
import java.util.Map;

import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.exception.ClientRequestException;
import com.aizixun.papertrading.model.Portfolio;

public interface UserService {
	public List<User> findAll();
	public User findById(int id);
	public Portfolio findPortfolioByToken(String token) throws ClientRequestException; 
	public boolean userNameExist(String userName);
	public boolean userEmailExist(String userEmail);
	public Map<String, Object> userSignIn(String userEmail, String userPassword); 
	public Map<String, Object> userSignUp(String userFirstName, String userLastName, String userEmail, String userPassword);
	public void userOrder(String token, String symbol, int quantity, boolean sale) throws ClientRequestException;
	public void save(User user);
	public void deleteById(int id); 
}
