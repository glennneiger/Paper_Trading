package com.aizixun.papertrading.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="holding_table")
public class Holding {
	// define fields
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="holding_id")
	private int id;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="stock_symbol")
	private String stockSymbol;
	
	@Column(name="price_paid")
	private String pricePaid;
	
	@Column(name="trade_date")
	private Timestamp tradeDate; 
	
	public Holding() {
		
	}
	
	public Holding(int id, int userId, String stockSymbol, String pricePaid, Timestamp tradeDate) {
		this.id = id;
		this.userId = userId;
		this.stockSymbol = stockSymbol;
		this.pricePaid = pricePaid;
		this.tradeDate = tradeDate;
	}

	@Override
	public String toString() {
		return "Holding [id=" + id + ", userId=" + userId + ", stockSymbol=" + stockSymbol + ", pricePaid=" + pricePaid
				+ ", tradeDate=" + tradeDate + "]";
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getStockSymbol() {
		return stockSymbol;
	}

	public void setStockSymbol(String stockSymbol) {
		this.stockSymbol = stockSymbol;
	}

	public String getPricePaid() {
		return pricePaid;
	}

	public void setPricePaid(String pricePaid) {
		this.pricePaid = pricePaid;
	}

	public Timestamp getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(Timestamp tradeDate) {
		this.tradeDate = tradeDate;
	}

}
