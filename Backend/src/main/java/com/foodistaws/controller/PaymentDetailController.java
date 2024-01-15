package com.foodistaws.controller;

import com.foodistaws.entity.PaymentDetail;
import com.foodistaws.service.PaymentDetailService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
public class PaymentDetailController {
    final
    PaymentDetailService paymentDetailService;

    public PaymentDetailController(PaymentDetailService paymentDetailService) {
        this.paymentDetailService = paymentDetailService;
    }

    @PostMapping("/")
    PaymentDetail createPaymentDetail(@RequestBody PaymentDetail newPaymentDetail){
        return paymentDetailService.create(newPaymentDetail);
    }

    @GetMapping("/{id}")
    PaymentDetail readOnePaymentDetail(@PathVariable String id){
        return paymentDetailService.readOne(id);
    }

    @GetMapping("/")
    List<PaymentDetail> readAllPaymentDetail(){
        return paymentDetailService.readAll();
    }

    @PutMapping("/{id}")
    PaymentDetail updatePaymentDetail(@RequestBody PaymentDetail newPaymentDetail, @PathVariable String id){
        return paymentDetailService.update(newPaymentDetail,id);
    }

    @DeleteMapping("/{id}")
    void deletePaymentDetail(@PathVariable String id){
        paymentDetailService.delete(id);
    }
}
