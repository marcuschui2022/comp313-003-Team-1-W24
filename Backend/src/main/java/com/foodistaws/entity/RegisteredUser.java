package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class RegisteredUser {
    @Id
    private String userID;
	private String fullName;
    private String email;
    private String userName;
    private String passwd;
    private Role role;
	public RegisteredUser(String userID, String fullName, String email, String userName, String passwd, Role role) {
		super();
		this.userID = userID;
		this.fullName = fullName;
		this.email = email;
		this.userName = userName;
		this.passwd = passwd;
		this.role = role;
	}
    public String getUserID() {
		return userID;
	}
	public void setUserID(String userID) {
		this.userID = userID;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPasswd() {
		return passwd;
	}
	public void setPasswd(String passwd) {
		this.passwd = passwd;
	}
	public Role getRole() {
		return role;
	}
	public void setRole(Role role) {
		this.role = role;
	}
}
