package com.foodistaws.controlleradvice;

import com.foodistaws.exception.BlogNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class BlogNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(BlogNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String BlogNotFoundHandler(BlogNotFoundException ex){
        return ex.getMessage();
    }
}
