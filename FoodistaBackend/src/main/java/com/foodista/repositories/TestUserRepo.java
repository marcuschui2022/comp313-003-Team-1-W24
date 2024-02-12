package com.foodista.repositories;

import java.io.Serializable;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.foodista.entities.TestUser;

public interface TestUserRepo extends CrudRepository<TestUser, Serializable> {

	@Query("SELECT t FROM TestUser t")
	Iterable<TestUser> findAll();
}
