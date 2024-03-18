package com.foodista.repositories;


import com.foodista.entities.CategoryDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryDetailRepository extends JpaRepository<CategoryDetail, Integer> {
}
