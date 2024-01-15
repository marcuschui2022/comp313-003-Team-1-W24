package com.foodistaws.repository;

import com.foodistaws.entity.Advertisement;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdvertisementRepository extends MongoRepository<Advertisement,String> {}
