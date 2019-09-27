package com.aizixun.papertrading.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StockInfo {
	
	/*
	private String symbol;
	private String companyName;
	private String primaryExchange;
	private String latestPrice;
	private String previousClose;
	private String change;
	private String changePercent;
	private String week52Low;
	private String week52High;
	private String isUSMarketOpen;

	private String marketcap;
	private String ttmEPS;
	private String peRatio;
	private String beta;
	*/
	
	private StockQuote stockQuote;
	private StockStats stockStats; 
	
	public StockInfo() {
		
	}
	
	public StockInfo(StockQuote stockQuote, StockStats stockStats) {
		this.stockQuote = stockQuote; 
		this.stockStats = stockStats; 
	}

	public StockQuote getStockQuote() {
		return stockQuote;
	}

	public StockStats getStockStats() {
		return stockStats;
	}
	
	
}
