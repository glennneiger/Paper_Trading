package com.aizixun.papertrading.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StockStats {

	@JsonProperty("marketcap")
	private double marketcap;
	
	@JsonProperty("ttmEPS")
	private double ttmEPS;
	
	@JsonProperty("peRatio")
	private double peRatio;
	
	@JsonProperty("beta")
	private double beta;
	
	public StockStats() {
		
	}

	public double getMarketcap() {
		return marketcap;
	}

	public double getTtmEPS() {
		return ttmEPS;
	}

	public double getPeRatio() {
		return peRatio;
	}

	public double getBeta() {
		return beta;
	}

	public void setMarketcap(double marketcap) {
		this.marketcap = marketcap;
	}

	public void setTtmEPS(double ttmEPS) {
		this.ttmEPS = ttmEPS;
	}

	public void setPeRatio(double peRatio) {
		this.peRatio = peRatio;
	}

	public void setBeta(double beta) {
		this.beta = beta;
	}
	
}
