package com.foodistaws.entity;

import com.foodistaws.enumeration.Category;
import com.foodistaws.enumeration.ContentClass;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;
import java.util.UUID;

@Document
@Data
public class Post {
    @Id
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

    public void setPostID() {
        this.postID = UUID.randomUUID().toString();
    }
}
