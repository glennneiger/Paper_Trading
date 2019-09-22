package com.aizixun.papertrading.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.model.StockChartElement;
import com.aizixun.papertrading.model.StockQuote;
import com.aizixun.papertrading.service.HoldingService;
import com.aizixun.papertrading.service.IEXCloudService;
import com.aizixun.papertrading.service.UserService;

import reactor.core.publisher.Flux;

@RestController
@RequestMapping("/api")
public class PapertradingRestController {
	
	private UserService userService;
	private HoldingService holdingService; 
	private IEXCloudService iexCloudService;
	
	@Autowired 
	public PapertradingRestController(UserService userService, HoldingService holdingService, IEXCloudService iexCloudService) {
		this.userService = userService; 
		this.holdingService = holdingService; 
		this.iexCloudService = iexCloudService; 
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
	public Flux<StockQuote> getStockQuote(@PathVariable String stockSymbol) {
		return iexCloudService.getStockQuote(stockSymbol); 
	}
	
	@GetMapping("/stock/chart/{stockSymbol}")
	public Flux<StockChartElement> getq(@PathVariable String stockSymbol) {
		return iexCloudService.getStockChart(stockSymbol); 
	}
	
	// --------- Official & In Use ----------
	@GetMapping("/user/email_exist")
	public boolean userEmailExist(@RequestParam(name = "user_email") String userEmail) {
		return userService.userEmailExist(userEmail); 
	}

}
