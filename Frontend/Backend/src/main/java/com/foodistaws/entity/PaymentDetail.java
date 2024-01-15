package com.foodistaws.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
public class PaymentDetail {
    @Id
    private String payDetID;
    private RegisteredUser user;
    private String cardNo;
    private String cardType;
    private String expiryDate;
    private String cardProvider;
}
