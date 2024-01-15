package com.foodistaws.controlleradvice;

import com.foodistaws.exception.AdvertisementNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class AdvertisementNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(AdvertisementNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String AdvertisementNotFoundHandler(AdvertisementNotFoundException ex){
        return ex.getMessage();
    }
}
