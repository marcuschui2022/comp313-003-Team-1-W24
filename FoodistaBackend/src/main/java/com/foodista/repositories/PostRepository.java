package com.foodista.repositories;

import com.foodista.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {

    // @Query("SELECT p FROM Post p")
    // Iterable<Post> findAll(String page);

    // @Query("SELECT p FROM Post p WHERE p.post_id = ?1")
    // Optional<Post> findById(Integer id);
}
