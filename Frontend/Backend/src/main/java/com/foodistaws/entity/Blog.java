package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.UUID;

@Document
@Data
public class Blog {
    @Id
    private String blogID;
    private RegisteredUser user;
    private String title;
    private String description;

    public void setBlogID() {
        this.blogID = UUID.randomUUID().toString();
    }

}
