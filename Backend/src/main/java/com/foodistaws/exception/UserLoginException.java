package com.foodistaws.exception;

public class UserLoginException extends RuntimeException {
    public UserLoginException() {
        super("wrong username or password.");
    }
}
