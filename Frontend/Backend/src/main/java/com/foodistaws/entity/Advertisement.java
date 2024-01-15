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
}
