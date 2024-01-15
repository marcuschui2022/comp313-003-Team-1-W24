package com.foodistaws.controlleradvice;

import com.foodistaws.exception.UserLoginException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class UserLoginAdvice {
    @ResponseBody
    @ExceptionHandler(UserLoginException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String RegisteredUserNotFoundHandler(UserLoginException ex){
        return ex.getMessage();
    }
}
