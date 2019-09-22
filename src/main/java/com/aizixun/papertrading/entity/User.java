package com.aizixun.papertrading.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="user_table")
public class User {
	// define fields
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="user_id")
	private int id;
	
	@Column(name="user_first_name")
	private String userFirstName;
	
	@Column(name="user_Last_name")
	private String userLastName;
	
	@Column(name="user_password")
	private String userPassword;
	
	@Column(name="user_email")
	private String userEmail;
	
	@Column(name="cash")
	private Double cash;
	
	
	@Column(name="created_date")
	private Timestamp createdDate; 
	
	
	public User() {	
		
	}


	public User(String userFirstName, String userLastName, String userPassword, String userEmail, Double cash, Timestamp createdDate) {
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userPassword = userPassword;
		this.userEmail = userEmail;
		this.cash = cash;
		this.createdDate = createdDate; 
	}


	@Override
	public String toString() {
		return "User [id=" + id + ", userFirstName=" + userFirstName + ", userLastName=" + userLastName
				+ ", userPassword=" + userPassword + ", userEmail=" + userEmail + ", cash=" + cash + ", createdDate="
				+ createdDate + "]";
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getUserFirstName() {
		return userFirstName;
	}


	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}


	public String getUserLastName() {
		return userLastName;
	}


	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}


	public String getUserPassword() {
		return userPassword;
	}


	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}


	public String getUserEmail() {
		return userEmail;
	}


	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}


	public Double getCash() {
		return cash;
	}


	public void setCash(Double cash) {
		this.cash = cash;
	}


	public Timestamp getCreatedDate() {
		return createdDate;
	}


	public void setCreatedDate(Timestamp createdDate) {
		this.createdDate = createdDate;
	}
	
	
}
