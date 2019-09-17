package com.aizixun.papertrading.rest;

import java.time.LocalDateTime;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PapertradingRestController {
	
	@GetMapping("/")
	public String helloWorld() {
		return "Hello World! Time on Server is " + LocalDateTime.now();
	}
	
	@GetMapping("/test")
	public String test() {
		return "LOL ";
	}


}
