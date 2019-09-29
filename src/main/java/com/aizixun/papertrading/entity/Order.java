package com.aizixun.papertrading.entity;

import java.sql.Timestamp;
import java.util.Comparator;

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
	
	@Column(name="status_type")
	private String statusType;
	
	@Column(name="quantity")
	private int quantity; 
	
	@Column(name="price_paid")
	private double price_paid;
	
	@Column(name="commission")
	private double commission;
	
	@Column(name="total")
	private double total;
	
	@Column(name="order_date")
	private Timestamp orderDate; 
	
	@Column(name="trade_date")
	private Timestamp tradeDate; 
	
	public Order() {
		// TODO Auto-generated constructor stub
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

	public String getStatusType() {
		return statusType;
	}

	public int getQuantity() {
		return quantity;
	}

	public double getPrice_paid() {
		return price_paid;
	}

	public double getCommission() {
		return commission;
	}

	public double getTotal() {
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

	public void setStatusType(String statusType) {
		this.statusType = statusType;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public void setPrice_paid(double price_paid) {
		this.price_paid = price_paid;
	}

	public void setCommission(double commission) {
		this.commission = commission;
	}

	public void setTotal(double total) {
		this.total = total;
	}

	public void setOrderDate(Timestamp orderDate) {
		this.orderDate = orderDate;
	}

	public void setTradeDate(Timestamp tradeDate) {
		this.tradeDate = tradeDate;
	}


	

}
