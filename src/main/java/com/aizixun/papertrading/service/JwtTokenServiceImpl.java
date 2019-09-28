package com.aizixun.papertrading.service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.exception.ClientRequestException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Service
public class JwtTokenServiceImpl implements JwtTokenService {
	
	private static final String CLAIM_KEY_USER_ID = "uid";
	private static final String CLAIM_KEY_USER_FIRST_NAME = "ufn"; 
	private static final String CLAIM_KEY_USER_LAST_NAME = "uln"; 
	private static final String CLAIM_KEY_EMAIL = "uem"; 
	private static final String CLAIM_KEY_CREATED = "iat";  
	
	@Value("${com.aizixun.papertrading.jwt.expiration}")
	private long expiration; 
	
	@Value("${com.aizixun.papertrading.jwt.secret}")
	private String secret; 
	
	
	private Claims getClaimsFromToken(String token) {
		Claims claims;
		try {
			claims = Jwts.parser()
						.setSigningKey(secret)
						.parseClaimsJws(token)
						.getBody();
		}
		catch (Exception e) {
			claims = null; 
		}
		return claims; 
	}
	
	@Override
	public String getUserFirstNameFromToken(String token) {
		try {
			Claims claims = getClaimsFromToken(token);
			return claims.get(CLAIM_KEY_USER_FIRST_NAME, String.class); 
		}
		catch (Exception e) {
			return null; 
		}
	}

	@Override
	public String getUserLastNameFromToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUserEmailFromToken(String token) {
		try {
			Claims claims = getClaimsFromToken(token);
			return claims.get(CLAIM_KEY_EMAIL, String.class); 
		}
		catch (Exception e) {
			return null; 
		}
	}
	
	@Override
	public int getUserIdFromToken(String token) throws ClientRequestException {
		try {
			Claims claims = getClaimsFromToken(token);
			return claims.get(CLAIM_KEY_USER_ID, Integer.class); 
		}
		catch (Exception e) {
			throw new ClientRequestException("invalid-token");
		}
	}

	@Override
	public Date getCreatedDateFromToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Date getExpedrationDateFromToken(String token) {
		// TODO Auto-generated method stub
		return null;
	}
	
	private Date generateExperiationDate() {
		return new Date(System.currentTimeMillis() + expiration * 1000); 
	}

	@Override
	public String generateToken(User user) {
		Map<String, Object> claims = new HashMap<String, Object>();
		claims.put(CLAIM_KEY_USER_ID, user.getId());
		claims.put(CLAIM_KEY_USER_FIRST_NAME, user.getUserFirstName());
		claims.put(CLAIM_KEY_USER_LAST_NAME, user.getUserLastName());
		claims.put(CLAIM_KEY_EMAIL, user.getUserEmail());
		claims.put(CLAIM_KEY_CREATED, new Date(System.currentTimeMillis()));
		
		String token = Jwts.builder()
						.setClaims(claims)
						.setExpiration(generateExperiationDate())
						.signWith(SignatureAlgorithm.HS512, secret)
						.compact(); 
		return token;
	}

	@Override
	public boolean validateToken(String token, User user) {
		// TODO 
		return false;
	}



}
