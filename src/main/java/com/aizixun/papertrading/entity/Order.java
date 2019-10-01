package com.aizixun.papertrading.entity;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="order_table")
public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="transaction_id")
	private int id;
	
	@Column(name="user_id")
	private int userId;
	
	@Column(name="stock_symbol")
	private String stockSymbol;
	
	@Column(name="action_type")
	private String actionType;
	
	@Column(name="price_type")
	private String priceType;
	
	@Column(name="status_type")
	private String statusType;
	
	@Column(name="quantity")
	private int quantity; 
	
	@Column(name="limit_price")
	private Double limitPrice;
	
	@Column(name="stop_price")
	private Double stopPrice;
	
	@Column(name="price_paid")
	private Double pricePaid;
	
	@Column(name="commission")
	private Double commission;
	
	@Column(name="total")
	private Double total;
	
	@Column(name="order_date")
	private Timestamp orderDate; 
	
	@Column(name="trade_date")
	private Timestamp tradeDate; 
	
	public Order() {
		// TODO Auto-generated constructor stub
	}
	
	public Order(int userId, String stockSymbol, String actionType, String statusType, int quantity, Double limitPrice, Double stopPrice, Double pricePaid, Double commission, Double total, Timestamp orderDate, Timestamp tradeDate) {
		this.userId = userId;
		this.stockSymbol = stockSymbol;
		this.actionType = actionType;
		this.statusType = statusType; 
		this.quantity = quantity; 
		
	}
	
	public void cancel() {
		statusType = "cancelled";
		Date date= new Date();
		Timestamp tradeDate = new Timestamp(date.getTime()); 
		this.commission = null; 
		this.tradeDate = tradeDate;
	}

	public int getId() {
		return id;
	}

	public int getUserId() {
		return userId;
	}

	public String getStockSymbol() {
		return stockSymbol;
	}

	public String getActionType() {
		return actionType;
	}

	public String getPriceType() {
		return priceType;
	}

	public String getStatusType() {
		return statusType;
	}

	public int getQuantity() {
		return quantity;
	}

	public Double getLimitPrice() {
		return limitPrice;
	}

	public Double getStopPrice() {
		return stopPrice;
	}

	public Double getPricePaid() {
		return pricePaid;
	}

	public Double getCommission() {
		return commission;
	}

	public Double getTotal() {
		return total;
	}

	public Timestamp getOrderDate() {
		return orderDate;
	}

	public Timestamp getTradeDate() {
		return tradeDate;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public void setStockSymbol(String stockSymbol) {
		this.stockSymbol = stockSymbol;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}

	public void setStatusType(String statusType) {
		this.statusType = statusType;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public void setLimitPrice(Double limitPrice) {
		this.limitPrice = limitPrice;
	}

	public void setStopPrice(Double stopPrice) {
		this.stopPrice = stopPrice;
	}

	public void setPricePaid(Double pricePaid) {
		this.pricePaid = pricePaid;
	}

	public void setCommission(Double commission) {
		this.commission = commission;
	}

	public void setTotal(Double total) {
		this.total = total;
	}

	public void setOrderDate(Timestamp orderDate) {
		this.orderDate = orderDate;
	}

	public void setTradeDate(Timestamp tradeDate) {
		this.tradeDate = tradeDate;
	}
	
	
	

}
