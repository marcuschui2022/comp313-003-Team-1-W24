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
}
