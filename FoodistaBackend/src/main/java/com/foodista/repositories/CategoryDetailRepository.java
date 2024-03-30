package com.foodista.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.foodista.entities.CategoryDetail;

public interface CategoryDetailRepository extends JpaRepository<CategoryDetail, Long> {

    @Query("SELECT c FROM CategoryDetail c")
    Iterable<CategoryDetail> findAllCategory();

    @Query("SELECT c FROM CategoryDetail c WHERE c.categoryId = ?1")
    Optional<CategoryDetail> findById(Long id);

}
