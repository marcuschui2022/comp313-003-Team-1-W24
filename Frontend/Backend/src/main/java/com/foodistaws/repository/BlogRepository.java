package com.foodistaws.repository;

import com.foodistaws.entity.Blog;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {

    // find all blogs by Registered User ID
    List<Blog> findBlogsByUser_UserID(String userID);


}
