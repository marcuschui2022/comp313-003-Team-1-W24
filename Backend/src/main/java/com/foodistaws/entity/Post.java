package com.foodistaws.entity;

import com.foodistaws.enumeration.Category;
import com.foodistaws.enumeration.ContentClass;
import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
@Document
@Data
public class Post {
	private String postID;
    private Blog blog;
    private String title;
    private String author;
    private Date pubDate;
    private Category category;
    private ContentClass classification;
    private CookingType cookingType;
    private CookingStyle cookingStyle;
    private Tag tags;
	public Post(String postID, Blog blog, String title, String author, Date pubDate, Category category,
			ContentClass classification, CookingType cookingType, CookingStyle cookingStyle, Tag tags) {
		super();
		this.postID = postID;
		this.blog = blog;
		this.title = title;
		this.author = author;
		this.pubDate = pubDate;
		this.category = category;
		this.classification = classification;
		this.cookingType = cookingType;
		this.cookingStyle = cookingStyle;
		this.tags = tags;
	}
	
	 public String getPostID() {
			return postID;
		}
		public void setPostID(String postID) {
			this.postID = postID;
		}
		public Blog getBlog() {
			return blog;
		}
		public void setBlog(Blog blog) {
			this.blog = blog;
		}
		public String getTitle() {
			return title;
		}
		public void setTitle(String title) {
			this.title = title;
		}
		public String getAuthor() {
			return author;
		}
		public void setAuthor(String author) {
			this.author = author;
		}
		public Date getPubDate() {
			return pubDate;
		}
		public void setPubDate(Date pubDate) {
			this.pubDate = pubDate;
		}
		public Category getCategory() {
			return category;
		}
		public void setCategory(Category category) {
			this.category = category;
		}
		public ContentClass getClassification() {
			return classification;
		}
		public void setClassification(ContentClass classification) {
			this.classification = classification;
		}
		public CookingType getCookingType() {
			return cookingType;
		}
		public void setCookingType(CookingType cookingType) {
			this.cookingType = cookingType;
		}
		public CookingStyle getCookingStyle() {
			return cookingStyle;
		}
		public void setCookingStyle(CookingStyle cookingStyle) {
			this.cookingStyle = cookingStyle;
		}
		public Tag getTags() {
			return tags;
		}
		public void setTags(Tag tags) {
			this.tags = tags;
		}
}
