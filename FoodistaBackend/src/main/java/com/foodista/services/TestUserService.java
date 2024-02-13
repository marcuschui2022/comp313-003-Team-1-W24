package com.foodista.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.foodista.entities.TestUser;
import com.foodista.repositories.TestUserRepo;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class TestUserService {

    @Autowired
    private TestUserRepo testUserRepo;

    public List<TestUser> getAll() {

        List<TestUser> testUsers = new ArrayList<TestUser>();

        testUserRepo.findAll().forEach(testUsers::add);

        return testUsers;
    }

    public Optional<TestUser> getById(final Integer id) {
        return testUserRepo.findById(id);
    }

    public Optional<TestUser> update(final Integer id, final TestUser testUser) {
        return testUserRepo.findById(id).map(existingTestUser -> {
            if (existingTestUser != null) {
                existingTestUser.setUsername(testUser.getUsername());
                existingTestUser.setEmail(testUser.getEmail());
                return testUserRepo.save(existingTestUser);
            } else {
                return null;
            }
        });
    }

    public TestUser save(final TestUser testUser) {
        return testUserRepo.save(testUser);
    }

    public Optional<TestUser> delete(final Integer id) {
        Optional<TestUser> testUserToBeDeleted = getById(id);

        if (testUserToBeDeleted.isPresent()) {
            testUserRepo.delete(testUserToBeDeleted.get());
        }

        return testUserToBeDeleted;
    }

}