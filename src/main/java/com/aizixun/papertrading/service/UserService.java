package com.aizixun.papertrading.service;

import java.util.List;

import com.aizixun.papertrading.entity.User;

public interface UserService {
	public List<User> findAll();
	public User findById(int id);
	public boolean userNameExist(String userName);
	public void save(User user);
	public void deleteById(int id); 
}
