package com.foodistaws.exception;

public class RegisteredUserNotFoundException extends RuntimeException {
    public RegisteredUserNotFoundException(String id) {
        super("could not find user with ID: %s".formatted(id));
    }
}
