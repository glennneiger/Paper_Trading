package com.aizixun.papertrading.service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
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
	
	private final double COMMISSION_SALE = 0;
	private final double COMMISSION_BUY = 4.95; 
	
	private final String ACTION_TYPE_SELL = "sell";
	private final String ACTION_TYPE_BUY = "buy";
	private final String ACTION_TYPE_SELL_SHORT = "sell-short";
	private final String ACTION_TYPE_BUY_TO_COVER = "buy-to-cover";
	
	private final String PRICE_TYPE_MARKET = "market"; 
	private final String PRICE_TYPE_LIMIT = "limit"; 
	private final String PRICE_TYPE_STOP_ON_QUOTE = "stop-on-quote"; 
	private final String PRICE_TYPE_STOP_LIMIT_ON_QUOTE = "stop-limit-on-quote"; 
	
	private final String STATUS_TYPE_OPEN = "open";
	private final String STATUS_TYPE_EXECUTED = "executed";
	private final String STATUS_TYPE_CANCELLED = "cancelled";

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
	
	private void processMarketOrderSell(Order order) throws ClientRequestException {	
		User user = userService.findById(order.getUserId());
		StockQuote stockQuote = getStockQuote(order.getStockSymbol()); 
		int quantity = order.getQuantity(); 
		
		Holding holding = checkSufficientShare(quantity, user, stockQuote.getSymbol());
		double totalPrice = stockQuote.getLatestPrice() * quantity; 
		if (holding.getQuantity() == quantity) {
			holdingService.deleteById(holding.getId());
			user.setCash(user.getCash() + totalPrice - COMMISSION_SALE);
		}
		else {
			Date date= new Date();
			Timestamp tradeDate = new Timestamp(date.getTime()); 
			holding.setTradeDate(tradeDate);
			holding.setQuantity(holding.getQuantity() - quantity);
			holdingService.save(holding);
			user.setCash(user.getCash() + totalPrice  - COMMISSION_SALE);
		}
		
		Date date= new Date();
		Timestamp timestamp = new Timestamp(date.getTime()); 
		
		order.setStatusType("executed");
		order.setPricePaid(stockQuote.getLatestPrice());
		order.setTotal(totalPrice  - COMMISSION_SALE);
		order.setTradeDate(timestamp);
		orderDAO.save(order);
	} 
	
	private void processMarketOrderBuy(Order order) throws ClientRequestException {
		User user = userService.findById(order.getUserId());
		StockQuote stockQuote = getStockQuote(order.getStockSymbol()); 
		int quantity = order.getQuantity(); 
		
		double totalPrice = stockQuote.getLatestPrice() * quantity; 

		user.setCash(user.getCash() - totalPrice - COMMISSION_BUY);
		
		Date date= new Date();
		Timestamp timestamp = new Timestamp(date.getTime()); 
		
		Holding holding = holdingService.findByUserIdAndSymbol(user.getId(), stockQuote.getSymbol());
		if (holding == null) {
			holding = new Holding(user.getId(), stockQuote.getSymbol(), stockQuote.getLatestPrice(), quantity, timestamp);
			holdingService.save(holding);
		}
		else {
			holding.setTradeDate(timestamp);
			int newQuantity = holding.getQuantity() + quantity;
			double newPricePaid = (holding.getPricePaid() * holding.getQuantity() + totalPrice) / newQuantity;
			holding.setQuantity(newQuantity);
			holding.setPricePaid(newPricePaid);
			holdingService.save(holding);
		}
		
		order.setStatusType("executed");
		order.setPricePaid(0 - stockQuote.getLatestPrice());
		order.setTotal(0 - totalPrice  - COMMISSION_BUY);
		order.setTradeDate(timestamp);
		orderDAO.save(order);
	}
	
	private void saveNewOrder(Order order) throws ClientRequestException {
		if (order.getPriceType().equals(this.PRICE_TYPE_MARKET)) {
			if (order.getActionType().equals(this.ACTION_TYPE_SELL)) {
				this.processMarketOrderSell(order);
			}
			else if (order.getActionType().equals(this.ACTION_TYPE_BUY)) {
				this.processMarketOrderBuy(order);
			}
		}
	}
	
	@Scheduled(cron = "30 9 * * 1-5", zone = "US/Eastern")
	private void processOpenOrder() {
		List<Order> orderList = orderDAO.findByStatus(STATUS_TYPE_OPEN);
		if (orderList.size() >= 1) {
			StockQuote stockQuote; 
			try {
				stockQuote = getStockQuote(orderList.get(0).getStockSymbol());
				if (! stockQuote.getIsUSMarketOpen()) return; 
			} catch (ClientRequestException e1) {
				return; 
			} 
		}
		
		for (Order order : orderList) {
			if (order.getPriceType().equals(PRICE_TYPE_MARKET)) {
				if (order.getActionType().equals(ACTION_TYPE_BUY)) {
					try {
						processMarketOrderBuy(order);
					}
					catch (Exception e) {
						order.setStatusType(STATUS_TYPE_CANCELLED);
					}
				}
				else if (order.getActionType().equals(ACTION_TYPE_SELL)) {
					try {
						processMarketOrderSell(order);
					}
					catch (Exception e) {
						order.setStatusType(STATUS_TYPE_CANCELLED);
					}
				}
			}
		}
	}
	
	@Override
	@Transactional
	public Order cancelByOrderId(String token, int orderId) throws ClientRequestException {
		int userId = jwtTokenService.getUserIdFromToken(token);
		Order order = orderDAO.findById(orderId); 
		if (order.getUserId() != userId) throw new ClientRequestException("invalid-id");
		if (!order.getStatusType().equals("open")) throw new ClientRequestException("non-open-order");
		order.cancel();
		orderDAO.save(order);
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
	
	private Holding checkSufficientShare(int quantity, User user, String symbol) throws ClientRequestException {
		Holding holding = holdingService.findByUserIdAndSymbol(user.getId(), symbol);
		// TODO Check existing orders 
		if (holding == null || (holding.getQuantity() < quantity)) {
			throw new ClientRequestException("insufficient-shares");
		}
		return holding; 
	} 
	
	private void checkSufficientFund(int quantity, User user, double price) throws ClientRequestException {
		double totalPrice = price * quantity; 
		// TODO Check existing orders 
		if (totalPrice > user.getCash()) {
			throw new ClientRequestException("insufficient-fund");
		}
	}
	
	private void newMarketOrderSale(int quantity, User user, StockQuote stockQuote) throws ClientRequestException {
		Holding holding = checkSufficientShare(quantity, user, stockQuote.getSymbol());
		
		Date date= new Date();
		Timestamp timestamp = new Timestamp(date.getTime()); 
		Order order = new Order(user.getId(), stockQuote.getSymbol(), "sell", "market", "open", quantity, null, null, null, COMMISSION_SALE, null, timestamp, null);
		saveNewOrder(order); 
	}	
	
	private void newMarketOrderBuy(int quantity, User user, StockQuote stockQuote) throws ClientRequestException {
		this.checkSufficientFund(quantity, user, stockQuote.getLatestPrice());
		
		Date date= new Date();
		Timestamp timestamp = new Timestamp(date.getTime()); 
		Order order = new Order(user.getId(), stockQuote.getSymbol(), ACTION_TYPE_BUY, PRICE_TYPE_MARKET, STATUS_TYPE_OPEN, quantity, null, null, null, - COMMISSION_BUY, null, timestamp, null);
		saveNewOrder(order); 
	}
	
	private String marketOrder(int userId, String token, String symbol, String actionType, int quantity) throws ClientRequestException {
		User user = userService.findById(userId);
		StockQuote stockQuote = getStockQuote(symbol); 
		if (actionType.equals("sell")) {
			newMarketOrderSale(quantity, user, stockQuote);
		}
		else if (actionType.equals("buy")) {
			newMarketOrderBuy(quantity, user, stockQuote);
		}
		return "order-placed"; 
	}
	
	private void validateOrderInput(int quantity, String actionType, String priceType, Double limitPrice) throws ClientRequestException {
		if (quantity <= 0) 
			throw new ClientRequestException("invalid-quantity");
		if (! (actionType.equals("sell") || actionType.equals("buy") || actionType.equals("sell-short") || actionType.equals("buy-to-cover"))) 
			throw new ClientRequestException("invalid-action");
		if (! (priceType.equals("market") || priceType.equals("limit") || priceType.equals("stop-on-quote") || priceType.equals("stop-limit-on-quote"))) 
			throw new ClientRequestException("invalid-price-type");
	}
	
	@Override
	@Transactional
	public String orderNew(String token, String symbol, String actionType, String priceType, int quantity, Double limitPrice, Double stopPrice) throws ClientRequestException {
		/* -- Validate Input -- */ 	
		int userId = jwtTokenService.getUserIdFromToken(token);
		validateOrderInput(quantity, actionType, priceType, limitPrice);
		
		if (priceType.equals("market")) {
			return marketOrder(userId, token, symbol, actionType, quantity);
		}
		return null; 
	}

}
