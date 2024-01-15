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
}
