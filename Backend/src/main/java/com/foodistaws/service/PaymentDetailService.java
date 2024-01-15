package com.foodistaws.service;

import com.foodistaws.entity.PaymentDetail;
import com.foodistaws.exception.PaymentDetailNotFoundException;
import com.foodistaws.repository.PaymentDetailRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentDetailService {
    private final PaymentDetailRepository repository;

    public PaymentDetailService(PaymentDetailRepository repository) {
        this.repository = repository;
    }

    public PaymentDetail create(PaymentDetail newPaymentDetail){
        return repository.save(newPaymentDetail);
    }

    public PaymentDetail readOne(String id){
        return repository.findById(id)
                .orElseThrow(() -> new PaymentDetailNotFoundException(id));
    }

    public List<PaymentDetail> readAll(){
        return repository.findAll();
    }

    public PaymentDetail update(PaymentDetail newPaymentDetail, String id){
        return repository.findById(id)
                .map(PayDetail -> {
                    PayDetail.setUser(newPaymentDetail.getUser());
                    PayDetail.setCardNo(newPaymentDetail.getCardNo());
                    PayDetail.setCardType(newPaymentDetail.getCardType());
                    PayDetail.setExpiryDate(newPaymentDetail.getExpiryDate());
                    PayDetail.setCardProvider(newPaymentDetail.getCardProvider());
                    return repository.save(PayDetail);
                }).orElseGet(() -> {
                    newPaymentDetail.setPayDetID(id);
                    return repository.save(newPaymentDetail);
                });
    }

    public void delete(String id){
        repository.deleteById(id);
    }
}
