package com.aizixun.papertrading.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aizixun.papertrading.dao.OrderDAO;
import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.Order;
import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.exception.ClientRequestException;
import com.aizixun.papertrading.model.StockQuote;

@Service
public class OrderServiceImpl implements OrderService {

	private OrderDAO orderDAO; 
	private JwtTokenService jwtTokenService; 
	private UserService userService; 
	private IEXCloudService iexCloudService;
	private HoldingService holdingService;
	
	@Autowired
	public OrderServiceImpl(OrderDAO orderDAO, JwtTokenService jwtTokenService, UserService userService, HoldingService holdingService, IEXCloudService iexCloudService) {
		this.orderDAO = orderDAO; 
		this.jwtTokenService = jwtTokenService; 
		this.userService = userService; 
		this.holdingService = holdingService; 
		this.iexCloudService = iexCloudService; 
	}

	@Override
	@Transactional
	public List<Order> findByUserId(String token) throws ClientRequestException {
		int userId = jwtTokenService.getUserIdFromToken(token);
		return orderDAO.findByUserId(userId);
	}
	
	@Override
	@Transactional
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
	
	@Override
	@Transactional
	public void save(Order order) {
		orderDAO.save(order);
	}
	
	@Override
	@Transactional
	public Order cancelByOrderId(String token, int orderId) throws ClientRequestException {
		int userId = jwtTokenService.getUserIdFromToken(token);
		Order order = orderDAO.findById(orderId); 
		if (order.getUserId() != userId) throw new ClientRequestException("invalid-id");
		if (!order.getStatusType().equals("open")) throw new ClientRequestException("non-open-order");
		order.cancel();
		save(order);
		return order;
	}
	
	private StockQuote getStockQuote(String symbol) throws ClientRequestException {
		try {
			return iexCloudService.getStockQuote(symbol).block(); 
		}
		catch(Exception e) {
			throw new ClientRequestException("invalid-symbol");
		}
	}
	
	
	private void userOrderSale(int quantity, User user, StockQuote stockQuote) throws ClientRequestException {
		double totalPrice = stockQuote.getLatestPrice() * quantity; 
		Holding holding = holdingService.findByUserIdAndSymbol(user.getId(), stockQuote.getSymbol());
		if (holding == null || (holding.getQuantity() < quantity)) {
			throw new ClientRequestException("insufficient-shares");
		}
		else if (holding.getQuantity() == quantity) {
			holdingService.deleteById(holding.getId());
			user.setCash(user.getCash() + totalPrice);
		}
		else {
			Date date= new Date();
			Timestamp tradeDate = new Timestamp(date.getTime()); 
			holding.setTradeDate(tradeDate);
			holding.setQuantity(holding.getQuantity() - quantity);
			holdingService.save(holding);
			user.setCash(user.getCash() + totalPrice);
		}
	}
	
	private void userOrderBuy(int quantity, User user, StockQuote stockQuote) throws ClientRequestException {
		double totalPrice = stockQuote.getLatestPrice() * quantity; 
		if (totalPrice > user.getCash()) {
			throw new ClientRequestException("insufficient-funds");
		}
		else {
			user.setCash(user.getCash() - totalPrice);
			
			Date date= new Date();
			Timestamp tradeDate = new Timestamp(date.getTime()); 
			Holding holding = holdingService.findByUserIdAndSymbol(user.getId(), stockQuote.getSymbol());
			if (holding == null) {
				holding = new Holding(user.getId(), stockQuote.getSymbol(), stockQuote.getLatestPrice(), quantity, tradeDate);
				holdingService.save(holding);
			}
			else {
				holding.setTradeDate(tradeDate);
				int newQuantity = holding.getQuantity() + quantity;
				double newPricePaid = (holding.getPricePaid() * holding.getQuantity() + totalPrice) / newQuantity;
				holding.setQuantity(newQuantity);
				holding.setPricePaid(newPricePaid);
				holdingService.save(holding);
			}
			
			Order order = new Order(); 
		}
	}
	
	@Override
	@Transactional
	public void orderNew(String token, String symbol, int quantity, boolean sale) throws ClientRequestException {
		if (quantity == 0) throw new ClientRequestException("invalid-quantity");
		int id = jwtTokenService.getUserIdFromToken(token);
		User user = userService.findById(id);
		StockQuote stockQuote = getStockQuote(symbol); 
		if (stockQuote.getIsUSMarketOpen()) {
			if (sale) {
				userOrderSale(quantity, user, stockQuote);
			}
			else {
				userOrderBuy(quantity, user, stockQuote);
			}
		}


	}

}
