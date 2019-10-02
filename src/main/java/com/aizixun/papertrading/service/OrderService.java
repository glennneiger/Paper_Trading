package com.aizixun.papertrading.service;

import java.util.List;
import java.util.Map;

import com.aizixun.papertrading.entity.Order;
import com.aizixun.papertrading.exception.ClientRequestException;

public interface OrderService {
	public List<Order> findByUserId(String token) throws ClientRequestException; 
	public Map<String, List<Order>> findByUserIdCategorized(String token) throws ClientRequestException;  
	public Order cancelByOrderId(String token, int orderId) throws ClientRequestException; 
	public String orderNew(String token, String symbol, String actionType, String priceType, int quantity, Double limitPrice, Double stopPrice) throws ClientRequestException;
}
