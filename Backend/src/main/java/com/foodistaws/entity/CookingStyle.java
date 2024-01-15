package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class CookingStyle {
    @Id
    private String styleID;
	private String name;
    private String description;
	public CookingStyle(String styleID, String name, String description) {
		super();
		this.styleID = styleID;
		this.name = name;
		this.description = description;
	}
	
    public String getStyleID() {
		return styleID;
	}
	public void setStyleID(String styleID) {
		this.styleID = styleID;
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
