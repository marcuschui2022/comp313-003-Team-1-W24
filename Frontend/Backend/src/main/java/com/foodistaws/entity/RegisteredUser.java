package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class RegisteredUser {
    @Id
    private String userID;
    private String fullName;
    private String email;
    private String userName;
    private String passwd;
    private Role role;
}
