package com.foodista.repositories;

import java.io.Serializable;
import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.foodista.entities.TestUser;

public interface TestUserRepo extends CrudRepository<TestUser, Serializable> {

    @Query("SELECT t FROM TestUser t")
    Iterable<TestUser> findAll();

    @Query("SELECT t FROM TestUser t WHERE t.ID = ?1")
    Optional<TestUser> findById(Integer id);

}
