package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Role {
    @Id
    private String roleID;
	private String name;
    private String description;
	public Role(String roleID, String name, String description) {
		super();
		this.roleID = roleID;
		this.name = name;
		this.description = description;
	}
    public String getRoleID() {
		return roleID;
	}
	public void setRoleID(String roleID) {
		this.roleID = roleID;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
}
