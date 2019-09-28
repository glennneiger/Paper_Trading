package com.aizixun.papertrading.service;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aizixun.papertrading.dao.UserDAO;
import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.exception.ClientRequestException;
import com.aizixun.papertrading.model.Portfolio;
import com.aizixun.papertrading.model.StockQuote;

@Service
public class UserServiceImpl implements UserService {
	
	private final String RESPONSE_SUCCESS = "success";
	private final String RESPONSE_FAIL_REASON = "cause";
	private final String RESPONSE_ID = "id"; 
	private final String RESPONSE_FIRST_NAME = "first_name";
	private final String RESPONSE_LAST_NAME = "last_name";
	private final String RESPONSE_TOKEN = "token"; 
	private final String RESPONSE_PORTFOLIO = "portfolio";
	
	private final String PATTERN_FIRST_NAME = "^[a-zA-Z]{1,15}$"; 
	private final String PATTERN_LAST_NAME = "^[a-zA-Z]{1,15}$"; 
	private final String PATTERN_EMAIL = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"; 
	private final String PATTERN_PASSWORD = "^[a-zA-Z0-9]{5,15}$";
	
	private final Double DEFAULT_CASH = 1000000.0;
	
	private UserDAO userDAO;
	private JwtTokenService jwtTokenService; 
	private HoldingService holdingService;
	private IEXCloudService iexCloudService;
	
	@Autowired
	public UserServiceImpl(UserDAO userDAO, JwtTokenService jwtTokenService, HoldingService holdingService, IEXCloudService iexCloudService) {
		this.userDAO = userDAO; 
		this.jwtTokenService = jwtTokenService; 
		this.holdingService = holdingService;
		this.iexCloudService = iexCloudService;
	}

	@Override
	@Transactional
	public List<User> findAll() {
		return userDAO.findAll();
	}

	@Override
	@Transactional
	public User findById(int id) {
		return userDAO.findById(id);
	}
	
	@Override
	@Transactional
	public Portfolio findPortfolioByToken(String token) throws ClientRequestException {
		Map<String, Object> response = new HashMap<String, Object>();
		int id = jwtTokenService.getUserIdFromToken(token);
		return new Portfolio(id, iexCloudService, this, holdingService); 
	}
	
	
	@Override
	@Transactional
	public boolean userNameExist(String userName) {
		List<User> userList = userDAO.findByUserName(userName);
		if (userList.size() == 1) return true; 
		return false; 
	}
	
	@Override
	@Transactional
	public boolean userEmailExist(String userEmail) {
		List<User> userList = userDAO.findByUserEmail(userEmail);
		if (userList.size() == 1) return true; 
		return false; 
	}
	
	private User checkUserPassword(String userEmail, String userPassword) {
		List<User> userList = userDAO.findByUserEmail(userEmail);
		if (userList.size() != 1) return null;
		User user = userList.get(0);
		if (user.getUserPassword().equals(userPassword)) return user; 
		return null;
	}
	
	@Override
	@Transactional
	public Map<String, Object> userSignIn(String userEmail, String userPassword) {	
		Map<String, Object> response = new HashMap<String, Object>();
		if (!Pattern.compile(PATTERN_EMAIL).matcher(userEmail).matches()
				|| !Pattern.compile(PATTERN_PASSWORD).matcher(userPassword).matches()) {
			response.put(RESPONSE_SUCCESS, false);
			return response; 	
		}
		User user = checkUserPassword(userEmail, userPassword); 
		if (user == null) {
			response.put(RESPONSE_SUCCESS, false);
			return response; 
		}
		else {
			response.put(RESPONSE_SUCCESS, true);
			response.put(RESPONSE_ID, user.getId());
			response.put(RESPONSE_FIRST_NAME, user.getUserFirstName());
			response.put(RESPONSE_LAST_NAME, user.getUserLastName());
			response.put(RESPONSE_TOKEN, jwtTokenService.generateToken(user));
			return response; 
		}
	}

	
	private Timestamp getCurrentTimestamp() {
		Instant now = Instant.now();
		Timestamp curent = Timestamp.from(now);
		return curent;
	}
	
	@Override
	@Transactional
	public Map<String, Object> userSignUp(String userFirstName, String userLastName, String userEmail, String userPassword) {
		Map<String, Object> response = new HashMap<String, Object>();
		if (!Pattern.compile(PATTERN_FIRST_NAME).matcher(userFirstName).matches()
				|| !Pattern.compile(PATTERN_LAST_NAME).matcher(userLastName).matches()
				|| !Pattern.compile(PATTERN_EMAIL).matcher(userEmail).matches()
				|| !Pattern.compile(PATTERN_PASSWORD).matcher(userPassword).matches()) {
			response.put(RESPONSE_SUCCESS, false);
			return response; 	
		}
		if (userEmailExist(userEmail)) {
			response.put(RESPONSE_SUCCESS, false);
			return response; 
		}
		User user = new User(userFirstName, userLastName, userPassword, userEmail, DEFAULT_CASH, getCurrentTimestamp());
		userDAO.save(user);
		response.put(RESPONSE_SUCCESS, true);
		response.put(RESPONSE_ID, user.getId());
		response.put(RESPONSE_FIRST_NAME, user.getUserFirstName());
		response.put(RESPONSE_LAST_NAME, user.getUserLastName());
		response.put(RESPONSE_TOKEN, jwtTokenService.generateToken(user));
		return response;
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
			

		}
	}
	
	@Override
	@Transactional
	public void userOrder(String token, String symbol, int quantity, boolean sale) throws ClientRequestException {
		if (quantity == 0) throw new ClientRequestException("invalid-quantity");
		int id = jwtTokenService.getUserIdFromToken(token);
		User user = findById(id);
		StockQuote stockQuote = getStockQuote(symbol); 

		if (sale) {
			userOrderSale(quantity, user, stockQuote);
		}
		else {
			userOrderBuy(quantity, user, stockQuote);
		}
	}
	
	@Override
	@Transactional
	public void save(User user) {
		userDAO.save(user);
	}

	@Override
	@Transactional
	public void deleteById(int id) {
		userDAO.deleteById(id);
	}


}
