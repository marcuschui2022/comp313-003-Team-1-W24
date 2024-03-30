package com.foodista.repositories;

import com.foodista.entities.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {

    @Query("SELECT p FROM Post p")
    Iterable<Post> findAllPost();

    @Query("SELECT p FROM Post p WHERE p.postId = ?1")
    Optional<Post> findById(Long id);

    @Query("SELECT p FROM Post p WHERE p.blog.blogId = ?1")
    Iterable<Post> findByBlogID(Long id);

    @Query("SELECT p FROM Post p WHERE p.blog.blogId = ?1")
    Iterable<Post> findByBlogIDArray(Long id);

    @Query("SELECT p FROM Post p WHERE p.id = ?1 AND p.blog.blogId = ?2")
    Optional<Post> findByIDAndBlogID(Long id, Long id2);

    @Query("SELECT p FROM Post p WHERE p.blog.blogId IN :blogIds")
    Iterable<Post> findByBlogIds(List<Long> blogIds);

    @Query("SELECT p FROM Post p WHERE p.blog.user.id = ?1")
    List<Post> findAllPostsByUserId(Long userId);
}
