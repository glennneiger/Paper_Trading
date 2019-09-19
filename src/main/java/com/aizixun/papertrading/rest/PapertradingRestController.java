package com.aizixun.papertrading.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.service.HoldingService;
import com.aizixun.papertrading.service.UserService;

@RestController
@RequestMapping("/api")
public class PapertradingRestController {
	
	private UserService userService;
	private HoldingService holdingService; 
	
	@Autowired 
	public PapertradingRestController(UserService userService, HoldingService holdingService) {
		this.userService = userService; 
		this.holdingService = holdingService; 
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
	
	@GetMapping("/test/user/{userId}")
	public User getUser(@PathVariable int userId) {
		User user = userService.findById(userId);
		if (user == null) throw new RuntimeException("User id not found - " + userId);
		return user; 
	}
	
	


}
