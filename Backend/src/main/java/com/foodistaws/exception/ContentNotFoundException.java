package com.foodistaws.exception;

public class ContentNotFoundException extends RuntimeException {
    public ContentNotFoundException(String id) {
        super("could not find user with ID: %s".formatted(id));
    }
}
