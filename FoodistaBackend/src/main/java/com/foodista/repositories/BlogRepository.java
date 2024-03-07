package com.foodista.repositories;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.foodista.entities.Blog;

public interface BlogRepository extends CrudRepository<Blog, Serializable> {

    @Query("SELECT b FROM Blog b")
    Iterable<Blog> findAll();

    @Query("SELECT b FROM Blog b WHERE b.blogId = ?1")
    Optional<Blog> findById(Integer id);

    @Query("SELECT b FROM Blog b WHERE b.user = ?1")
    Iterable<Blog> findByUserID(Integer id);
}
