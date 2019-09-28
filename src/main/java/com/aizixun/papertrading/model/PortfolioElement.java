package com.aizixun.papertrading.model;

import com.aizixun.papertrading.entity.Holding;
import com.aizixun.papertrading.service.IEXCloudService;


public class PortfolioElement {
	
	private String symbol;				
	private double lastPrice; 			
	private double change;				
	private double changePercentage; 	
	private int quantity; 				
	private double pricePaid;			
	private double dayGain;				
	private double totalGain;
	private double totalGainPercentage;
	private double value;
	
	public PortfolioElement() {
		
	}
	
	public PortfolioElement(Holding holding, IEXCloudService iexCloudService) {
		this.symbol = holding.getStockSymbol();
		this.pricePaid = holding.getPricePaid();
		this.quantity = holding.getQuantity();
		requestStockData(iexCloudService);
	}
	
	private void requestStockData(IEXCloudService iexCloudService) {
		StockQuote stockQuote = iexCloudService.getStockQuote(symbol).block(); 
		
		lastPrice = stockQuote.getLatestPrice(); 
		
		double previousClose = stockQuote.getPreviousClose();
		change = lastPrice - previousClose;
		changePercentage = change / previousClose * 100; 
		
		dayGain = change * quantity; 
		
		value = lastPrice * quantity;
		
		double totalPricePaid = pricePaid * quantity; 
		totalGain = value - totalPricePaid ; 
		totalGainPercentage = totalGain / totalPricePaid * 100;
	}
	
	
	@Override
	public String toString() {
		return "PortfolioElement [symbol=" + symbol + ", lastPrice=" + lastPrice + ", change=" + change
				+ ", changePercentage=" + changePercentage + ", quantity=" + quantity + ", pricePaid=" + pricePaid
				+ ", dayGain=" + dayGain + ", totalGain=" + totalGain + ", totalGainPercentage=" + totalGainPercentage
				+ ", value=" + value + "]";
	}

	public String getSymbol() {
		return symbol;
	}

	public double getLastPrice() {
		return lastPrice;
	}

	public double getChange() {
		return change;
	}

	public double getChangePercentage() {
		return changePercentage;
	}

	public int getQuantity() {
		return quantity;
	}

	public double getPricePaid() {
		return pricePaid;
	}

	public double getDayGain() {
		return dayGain;
	}

	public double getTotalGain() {
		return totalGain;
	}

	public double getTotalGainPercentage() {
		return totalGainPercentage;
	}

	public double getValue() {
		return value;
	}
	
}
