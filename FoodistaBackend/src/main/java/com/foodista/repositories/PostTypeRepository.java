package com.foodista.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.foodista.entities.PostType;


public interface PostTypeRepository extends JpaRepository<PostType, Long> {

    @Query("SELECT pt FROM PostType pt")
    Iterable<PostType> findAllPostType();

    @Query("SELECT pt FROM PostType pt WHERE pt.postTypeId = ?1")
    Optional<PostType> findById(Long id);
}
