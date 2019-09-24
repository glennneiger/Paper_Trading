package com.aizixun.papertrading.model;

import java.util.ArrayList;
import java.util.List;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.entity.User;
import com.aizixun.papertrading.service.HoldingService;
import com.aizixun.papertrading.service.IEXCloudService;
import com.aizixun.papertrading.service.UserService;

public class Portfolio {
	private int userId; 
	private String firstName;
	private String lastName;
	private double cash; 
	private double netAssets;
	private double totalGain;
	private List<PortfolioElement> portfolioHolding; 
	
	
	public Portfolio() {
		
	}
	
	public Portfolio(int userId, IEXCloudService iexCloudService, UserService userService, HoldingService holdingService) {
		this.userId = userId; 
		requestUserData(userService); 
		requestHoldingData(iexCloudService, holdingService);
		calculateNetAsset();
		calculateTotalGain();
	}
	
	private void requestUserData(UserService userService) {
		User user = userService.findById(userId); 
		this.userId = user.getId();
		this.firstName = user.getUserFirstName();
		this.lastName = user.getUserLastName();
		this.cash = user.getCash(); 
	}
	
	private void requestHoldingData(IEXCloudService iexCloudService, HoldingService holdingService) {
		portfolioHolding = new ArrayList<PortfolioElement>();
		List<Holding> holdingList = holdingService.findByUserId(userId); 
		for(Holding holding : holdingList) {
			portfolioHolding.add(new PortfolioElement(holding, iexCloudService)); 
		}
	}
	
	private void calculateNetAsset() {
		double result = 0; 
		for(PortfolioElement portfolioElement : portfolioHolding) {
			result += portfolioElement.getValue();
		}
		result += cash;
		netAssets = result; 
	}
	
	private void calculateTotalGain() {
		double result = 0; 
		for(PortfolioElement portfolioElement : portfolioHolding) {
			result += portfolioElement.getTotalGain();
		}
		totalGain = result; 
	}


	@Override
	public String toString() {
		return "Portfolio [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", cash=" + cash
				+ ", netAssets=" + netAssets + ", totalGain=" + totalGain + ", portfolioHolding=" + portfolioHolding
				+ "]";
	}

	public int getUserId() {
		return userId;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public double getCash() {
		return cash;
	}

	public List<PortfolioElement> getPortfolioHolding() {
		return portfolioHolding;
	}

	public double getNetAssets() {
		return netAssets;
	}

	public double getTotalGain() {
		return totalGain;
	}
	

}
