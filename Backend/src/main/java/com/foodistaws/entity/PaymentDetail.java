package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class PaymentDetail {
    @Id
    private String payDetID;
	private RegisteredUser user;
    private String cardNo;
    private String cardType;
    private String expiryDate;
    private String cardProvider;
	public PaymentDetail(String payDetID, RegisteredUser user, String cardNo, String cardType, String expiryDate,
			String cardProvider) {
		super();
		this.payDetID = payDetID;
		this.user = user;
		this.cardNo = cardNo;
		this.cardType = cardType;
		this.expiryDate = expiryDate;
		this.cardProvider = cardProvider;
	}
    public String getPayDetID() {
		return payDetID;
	}
	public void setPayDetID(String payDetID) {
		this.payDetID = payDetID;
	}
	public RegisteredUser getUser() {
		return user;
	}
	public void setUser(RegisteredUser user) {
		this.user = user;
	}
	public String getCardNo() {
		return cardNo;
	}
	public void setCardNo(String cardNo) {
		this.cardNo = cardNo;
	}
	public String getCardType() {
		return cardType;
	}
	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public String getCardProvider() {
		return cardProvider;
	}
	public void setCardProvider(String cardProvider) {
		this.cardProvider = cardProvider;
	}
}
