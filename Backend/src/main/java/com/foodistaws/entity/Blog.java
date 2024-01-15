package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Blog {

	private String blogID;
    private RegisteredUser user;
    private String title;
    private String description;
	public Blog(String blogID, RegisteredUser user, String title, String description) {
		super();
		this.blogID = blogID;
		this.user = user;
		this.title = title;
		this.description = description;
	}
	
    public String getBlogID() {
		return blogID;
	}
	public void setBlogID(String blogID) {
		this.blogID = blogID;
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
