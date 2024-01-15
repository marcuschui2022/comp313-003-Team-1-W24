package com.foodistaws.controlleradvice;

import com.foodistaws.exception.RegisteredUserNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RegisteredUserNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(RegisteredUserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String RegisteredUserNotFoundHandler(RegisteredUserNotFoundException ex){
        return ex.getMessage();
    }
}
