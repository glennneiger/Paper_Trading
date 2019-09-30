package com.aizixun.papertrading.rest;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.Order;
import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.exception.ClientRequestException;
import com.aizixun.papertrading.model.MarketSnapshot;
import com.aizixun.papertrading.model.Portfolio;
import com.aizixun.papertrading.model.StockChartElement;
import com.aizixun.papertrading.model.StockInfo;
import com.aizixun.papertrading.service.HoldingService;
import com.aizixun.papertrading.service.IEXCloudService;
import com.aizixun.papertrading.service.OrderService;
import com.aizixun.papertrading.service.UserService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
public class PapertradingRestController {
	
	private UserService userService;
	private HoldingService holdingService; 
	private IEXCloudService iexCloudService;
	private OrderService orderService; 
	
	@Autowired 
	public PapertradingRestController(UserService userService, HoldingService holdingService, IEXCloudService iexCloudService, OrderService orderService) {
		this.userService = userService; 
		this.holdingService = holdingService; 
		this.iexCloudService = iexCloudService; 
		this.orderService = orderService; 
	}
	
	
	@GetMapping("/test")
	public String test() {
		return "LOL ";
	}
	
	@GetMapping("/test/user")
	public List<User> testUser() {
		return userService.findAll(); 
	}
	
	@GetMapping("/test/holding")
	public List<Holding> testHolding() {
		return holdingService.findAll(); 
	}
	
	@GetMapping("/user/{userId}")
	public User getUser(@PathVariable int userId) {
		User user = userService.findById(userId);
		if (user == null) throw new RuntimeException("User id not found - " + userId);
		return user; 
	}
	
	@GetMapping("/user/exist/{userName}")
	public boolean getUser(@PathVariable String userName) {
		return userService.userNameExist(userName); 
	}
	
	@GetMapping("/user/holding/{userId}")
	public List<Holding> getHolding(@PathVariable int userId) {
		List<Holding> holdings = holdingService.findByUserId(userId);
		if (holdings == null) throw new RuntimeException("User id not found - " + userId);
		return holdings; 
	}
	
	@GetMapping("/stock/quote/{stockSymbol}")
	public String getStockQuote(@PathVariable String stockSymbol) {
		try {
			iexCloudService.getStockQuote(stockSymbol).block(); 
			return "Success";
		}
		catch(Exception e) {
			return "Error"; 
		}
	}
	

	
	// --------- Official & In Use ----------
	@GetMapping("/stock/info")
	public StockInfo stockInfo(@RequestParam(name = "token") String token, @RequestParam(name = "symbol") String symbol) {
		return iexCloudService.getStockInfo(symbol);
	}
	
	@GetMapping("/stock/index")
	public MarketSnapshot stockIndex(@RequestParam(name = "token") String token) {
		return iexCloudService.getMarketSnapshot(token); 
	}
	
	@GetMapping("/stock/chart")
	public Flux<StockChartElement> stockChart(@RequestParam(name = "token") String token, @RequestParam(name = "symbol") String stockSymbol) {
		return iexCloudService.getStockChart(stockSymbol); 
	}
	
	@GetMapping("/order/categorized")
	public Map<String, List<Order>> orderCategorized(@RequestParam(name = "token") String token) {
		try {
			return orderService.findByUserIdCategorized(token); 
		}
		catch (ClientRequestException e) {
	        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	} 
	
	@GetMapping("/user/email_exist")
	public boolean userEmailExist(@RequestParam(name = "user_email") String userEmail) {
		return userService.userEmailExist(userEmail); 
	}
	
	@GetMapping("/user/portfolio")
	public Portfolio getUserPortfolio(@RequestParam(name = "token") String token) {
		try {
			return userService.findPortfolioByToken(token); 
		}
		catch (ClientRequestException e) {
	        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	@PostMapping("/user/order")
	public void userOrder(@RequestBody Map<String, Object> body) {
		String token = (String) body.get("token"); 
		String symbol = (String) body.get("symbol"); 
		int quantity = (int) body.get("quantity");
		boolean sale = (boolean) body.get("sale"); 
		try {
			userService.userOrder(token, symbol, quantity, sale); 
		}
		catch (ClientRequestException e) {
	        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	
	@PostMapping("/user/sign_in")
	public Map<String, Object> userSignIn(@RequestBody Map<String, Object> body) {
		String userEmail = (String) body.get("user_email"); 
		String userPassword = (String) body.get("user_password"); 
		return userService.userSignIn(userEmail, userPassword); 
	}
	
	@PostMapping("/user/sign_up")
	public Map<String, Object> userSignUp(@RequestBody Map<String, Object> body) {
		String userFirstName = (String) body.get("user_first_name"); 
		String userLastName = (String) body.get("user_last_name"); 
		String userPassword = (String) body.get("user_password"); 
		String userEmail = (String) body.get("user_email"); 
		return userService.userSignUp(userFirstName, userLastName, userEmail, userPassword); 
	}
	
	@PostMapping("/order/cancel")
	public Order orderCancel(@RequestBody Map<String, Object> body) {
		String token = (String) body.get("token");
		int orderId = (int) body.get("orderId");
		try {
			return orderService.cancelByOrderId(token, orderId );
		} catch (ClientRequestException e) {
			throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, e.getMessage());
		}
	}
	

}
