package com.foodistaws.exception;

public class PaymentDetailNotFoundException extends RuntimeException {
    public PaymentDetailNotFoundException(String id) {
        super("could not find payment detail with ID: %s".formatted(id));
    }
}
