package com.aizixun.papertrading.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StockQuote {
	@JsonProperty("symbol")
	private String symbol;
	
	@JsonProperty("companyName")
	private String companyName;
	
	@JsonProperty("primaryExchange")
	private String primaryExchange;
	
	@JsonProperty("latestPrice")
	private double latestPrice;
	
	@JsonProperty("previousClose")
	private double previousClose;
	
	@JsonProperty("change")
	private double change;
	
	@JsonProperty("changePercent")
	private double changePercent;
	
	@JsonProperty("week52Low")
	private double week52Low;
	
	@JsonProperty("week52High")
	private double week52High;
	
	@JsonProperty("isUSMarketOpen")
	private boolean isUSMarketOpen;
	
	public StockQuote() {
		
	}

	public String getSymbol() {
		return symbol;
	}

	public String getCompanyName() {
		return companyName;
	}

	public String getPrimaryExchange() {
		return primaryExchange;
	}

	public double getLatestPrice() {
		return latestPrice;
	}

	public double getPreviousClose() {
		return previousClose;
	}

	public double getChange() {
		return change;
	}

	public double getChangePercent() {
		return changePercent;
	}

	public double getWeek52Low() {
		return week52Low;
	}

	public double getWeek52High() {
		return week52High;
	}

	public boolean getIsUSMarketOpen() {
		return isUSMarketOpen;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public void setPrimaryExchange(String primaryExchange) {
		this.primaryExchange = primaryExchange;
	}

	public void setLatestPrice(double latestPrice) {
		this.latestPrice = latestPrice;
	}

	public void setPreviousClose(double previousClose) {
		this.previousClose = previousClose;
	}

	public void setChange(double change) {
		this.change = change;
	}

	public void setChangePercent(double changePercent) {
		this.changePercent = changePercent;
	}

	public void setWeek52Low(double week52Low) {
		this.week52Low = week52Low;
	}

	public void setWeek52High(double week52High) {
		this.week52High = week52High;
	}

	public void setIsUSMarketOpen(boolean isUSMarketOpen) {
		this.isUSMarketOpen = isUSMarketOpen;
	}


}
