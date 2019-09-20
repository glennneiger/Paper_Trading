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
	
	public StockQuote() {
		
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getPrimaryExchange() {
		return primaryExchange;
	}

	public void setPrimaryExchange(String primaryExchange) {
		this.primaryExchange = primaryExchange;
	}

	public double getLatestPrice() {
		return latestPrice;
	}

	public void setLatestPrice(double latestPrice) {
		this.latestPrice = latestPrice;
	}

	public double getPreviousClose() {
		return previousClose;
	}

	public void setPreviousClose(double previousClose) {
		this.previousClose = previousClose;
	}

}
