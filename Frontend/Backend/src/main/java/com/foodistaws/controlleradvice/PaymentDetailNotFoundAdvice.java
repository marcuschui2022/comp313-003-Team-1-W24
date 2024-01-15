package com.foodistaws.controlleradvice;

import com.foodistaws.exception.PaymentDetailNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class PaymentDetailNotFoundAdvice {
    @ResponseBody
    @ExceptionHandler(PaymentDetailNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String PaymentDetailNotFoundHandler(PaymentDetailNotFoundException ex){
        return ex.getMessage();
    }
}
