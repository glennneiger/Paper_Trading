package com.aizixun.papertrading.model;

import com.fasterxml.jackson.annotation.JsonProperty;

public class StockChartElement {
	
	@JsonProperty("date")
	private String date;
	
	@JsonProperty("open")
	private double open;
	
	@JsonProperty("close")
	private double close;
	
	@JsonProperty("high")
	private double high;
	
	@JsonProperty("low")
	private double low;
	
	@JsonProperty("volume")
	private double volume;
	
	public StockChartElement() {
		
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public double getOpen() {
		return open;
	}

	public void setOpen(double open) {
		this.open = open;
	}

	public double getClose() {
		return close;
	}

	public void setClose(double close) {
		this.close = close;
	}

	public double getHigh() {
		return high;
	}

	public void setHigh(double high) {
		this.high = high;
	}

	public double getLow() {
		return low;
	}

	public void setLow(double low) {
		this.low = low;
	}

	public double getVolume() {
		return volume;
	}

	public void setVolume(double volume) {
		this.volume = volume;
	}
	
}
