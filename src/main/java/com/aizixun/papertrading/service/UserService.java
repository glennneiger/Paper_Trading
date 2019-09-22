package com.aizixun.papertrading.service;

import java.util.List;
import java.util.Map;

import com.aizixun.papertrading.entity.User;

public interface UserService {
	public List<User> findAll();
	public User findById(int id);
	public boolean userNameExist(String userName);
	public boolean userEmailExist(String userEmail);
	public Map<String, Object> userSignIn(String userEmail, String userPassword); 
	public void save(User user);
	public void deleteById(int id); 
}
