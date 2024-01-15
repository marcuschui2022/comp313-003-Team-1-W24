package com.foodistaws.repository;

import com.foodistaws.entity.PaymentDetail;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentDetailRepository extends MongoRepository<PaymentDetail,String> {
}
