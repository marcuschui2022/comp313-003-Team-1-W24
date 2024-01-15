package com.foodistaws.entity;

import lombok.Data;

@Data
public class Tag {
	private String TagID;

	public Tag(String tagID) {
		super();
		TagID = tagID;
	}
	
    public String getTagID() {
		return TagID;
	}

	public void setTagID(String tagID) {
		TagID = tagID;
	}
}
