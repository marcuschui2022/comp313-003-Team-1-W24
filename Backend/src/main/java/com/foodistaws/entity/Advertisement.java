package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Advertisement {
	private String advertID;
    @DBRef
    private RegisteredUser user;
    private String title;
    private String description;
	public Advertisement(String advertID, RegisteredUser user, String title, String description) {
		super();
		this.advertID = advertID;
		this.user = user;
		this.title = title;
		this.description = description;
	}
    public String getAdvertID() {
		return advertID;
	}
	public void setAdvertID(String advertID) {
		this.advertID = advertID;
	}
	public RegisteredUser getUser() {
		return user;
	}
	public void setUser(RegisteredUser user) {
		this.user = user;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
