package com.aizixun.papertrading.dao;

import java.util.List;

import com.aizixun.papertrading.entity.User;

public interface UserDAO {
	public List<User> findAll(); 
	public User findById(int id);
	public List<User> findByUserName(String userName);
	public List<User> findByUserEmail(String userEmail); 
	public void save(User user);
	public void deleteById(int id); 
}
