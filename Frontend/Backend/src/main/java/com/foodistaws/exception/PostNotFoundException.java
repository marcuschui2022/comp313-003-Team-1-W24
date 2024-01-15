package com.foodistaws.exception;

public class PostNotFoundException extends RuntimeException {
    public PostNotFoundException(String id) {
        super("could not find user with ID: %s".formatted(id));
    }
}
