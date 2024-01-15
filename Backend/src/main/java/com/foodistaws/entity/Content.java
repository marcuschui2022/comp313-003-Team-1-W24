package com.foodistaws.entity;

import com.foodistaws.enumeration.ContentType;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class Content {
	private String ContentID;
    private ContentType contentType;
    private String fileName;
	public Content(String contentID, ContentType contentType, String fileName) {
		super();
		ContentID = contentID;
		this.contentType = contentType;
		this.fileName = fileName;
	}
    public String getContentID() {
		return ContentID;
	}
	public void setContentID(String contentID) {
		ContentID = contentID;
	}
	public ContentType getContentType() {
		return contentType;
	}
	public void setContentType(ContentType contentType) {
		this.contentType = contentType;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
}
