package com.aizixun.papertrading.model;

public class StockInfo {

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
