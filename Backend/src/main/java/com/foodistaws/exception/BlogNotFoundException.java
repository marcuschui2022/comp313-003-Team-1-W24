package com.foodistaws.exception;

public class BlogNotFoundException extends RuntimeException {
    public BlogNotFoundException(String id) {
        super("could not find advert with ID: %s".formatted(id));
    }
}
