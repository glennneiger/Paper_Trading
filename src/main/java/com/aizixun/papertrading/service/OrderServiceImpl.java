package com.aizixun.papertrading.service;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.aizixun.papertrading.dao.OrderDAO;
import com.aizixun.papertrading.entity.Order;
import com.aizixun.papertrading.exception.ClientRequestException;

@Service
public class OrderServiceImpl implements OrderService {

	private OrderDAO orderDAO; 
	private JwtTokenService jwtTokenService; 
	
	@Autowired
	public OrderServiceImpl(OrderDAO orderDAO, JwtTokenService jwtTokenService) {
		this.orderDAO = orderDAO; 
		this.jwtTokenService = jwtTokenService; 
	}

	@Override
	public List<Order> findByUserId(String token) throws ClientRequestException {
		int userId = jwtTokenService.getUserIdFromToken(token);
		return orderDAO.findByUserId(userId);
	}
	

	
	public Map<String, List<Order>> findByUserIdCategorized(String token) throws ClientRequestException {
		int userId = jwtTokenService.getUserIdFromToken(token);
		List<Order> orderList =  orderDAO.findByUserId(userId);
		
		List<Order> orderListOpen =  new ArrayList<Order>(); 
		List<Order> orderListExecuted =  new ArrayList<Order>();
		List<Order> orderListCancelled =  new ArrayList<Order>();
		
		for (Order order : orderList) {
			if (order.getStatusType().equals("open")) orderListOpen.add(order);
			else if (order.getStatusType().equals("executed")) orderListExecuted.add(order);
			else if (order.getStatusType().equals("cancelled")) orderListCancelled.add(order);
		}
		
		Map<String, List<Order>> result = new HashMap<String, List<Order>>(); 	
		result.put("open", orderListOpen);
		result.put("executed", orderListExecuted);
		result.put("cancelled", orderListCancelled);
		
		Comparator<Order> orderDateComparator = new Comparator<Order>(){
			public int compare(Order o1, Order o2) {
				return -o1.getOrderDate().compareTo(o2.getOrderDate()); 
			}
		};
		
		Comparator<Order> tradeDateComparator = new Comparator<Order>(){
			public int compare(Order o1, Order o2) {
				return -o1.getTradeDate().compareTo(o2.getTradeDate()); 
			}
		};
		
		orderListOpen.sort(orderDateComparator);
		orderListExecuted.sort(tradeDateComparator);
		orderListCancelled.sort(tradeDateComparator);
		
		return result; 
	}

}
