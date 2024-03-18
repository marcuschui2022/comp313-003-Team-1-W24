package com.foodista.repositories;


import com.foodista.entities.PostType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostTypeRepository extends JpaRepository<PostType, Integer> {
}
