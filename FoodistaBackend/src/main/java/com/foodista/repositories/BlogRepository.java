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

    @Query("SELECT b FROM Blog b WHERE b.id = ?1")
    Optional<Blog> findById(Long id);

    @Query("SELECT b FROM Blog b WHERE b.user.id = ?1")
    Iterable<Blog> findByUserID(Long id);

    @Query("SELECT b FROM Blog b WHERE b.id = ?1 AND b.user.id = ?2")
    Optional<Blog> findByIDAndUserID(Long id, Long id2);

    @Query("SELECT b FROM Blog b WHERE b.title = 'default'")
    Optional<Blog> findByDefault();
}
