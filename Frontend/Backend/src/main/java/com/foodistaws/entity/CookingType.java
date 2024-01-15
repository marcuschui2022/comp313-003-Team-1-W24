package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class CookingType {
    @Id
    private String typeID;
    private String name;
    private String description;
}
