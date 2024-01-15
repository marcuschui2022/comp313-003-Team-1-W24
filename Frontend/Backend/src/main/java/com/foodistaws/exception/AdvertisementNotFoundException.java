package com.foodistaws.exception;

public class AdvertisementNotFoundException extends RuntimeException {
    public AdvertisementNotFoundException(String id) {
        super("could not find advert with ID: %s".formatted(id));
    }
}
