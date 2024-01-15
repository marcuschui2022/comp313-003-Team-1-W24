package com.foodistaws.repository;

import com.foodistaws.entity.Content;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContentRepository extends MongoRepository<Content,String> {
}
