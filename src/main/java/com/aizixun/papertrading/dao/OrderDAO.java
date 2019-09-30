package com.aizixun.papertrading.dao;

import java.util.List;

import com.aizixun.papertrading.entity.Order;

public interface OrderDAO {
	public Order findById(int id);
	public void save(Order order);
	public List<Order> findByUserId(int userId); 
}
