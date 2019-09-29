package com.aizixun.papertrading.dao;

import java.util.List;

import com.aizixun.papertrading.entity.Order;

public interface OrderDAO {
	public List<Order> findByUserId(int userId); 
}
