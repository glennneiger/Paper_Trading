package com.aizixun.papertrading.service;

import java.io.Serializable;
import java.util.Date;

import com.aizixun.papertrading.entity.User;

public interface JwtTokenService extends Serializable {
	public String getUserFirstNameFromToken(String token);
	public String getUserLastNameFromToken(String token);
	public String getUserEmailFromToken(String token);
	public int getUserIdFromToken(String token);
	public Date getCreatedDateFromToken(String token);
	public Date getExpedrationDateFromToken(String token); 
	
	public String generateToken(User user);
	public boolean validateToken(String token, User user); 
}
