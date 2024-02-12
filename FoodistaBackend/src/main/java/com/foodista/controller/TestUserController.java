package com.foodista.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.foodista.entities.TestUser;
import com.foodista.repositories.TestUserRepo;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class TestUserController {

	@Autowired
	private TestUserRepo testUserRepo;

	@GetMapping("/testUser")
	public ResponseEntity<List<TestUser>> getAllTestUser(@RequestParam(required = false) String title) {
		try {
			List<TestUser> testUsers = new ArrayList<TestUser>();

			testUserRepo.findAll().forEach(testUsers::add);

			if (testUsers.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(testUsers, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/testUser/{id}")
	public ResponseEntity<TestUser> getTestUserById(@PathVariable("id") Integer id) {
		Optional<TestUser> testUser = testUserRepo.findById(id);

		if (testUser.isPresent()) {
			return new ResponseEntity<>(testUser.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PostMapping("/testUser")
	public ResponseEntity<TestUser> createTestUser(@RequestBody TestUser testUser) {
		try {
			TestUser _testUser = testUserRepo.save(new TestUser(testUser.getId(), testUser.getUsername(), testUser.getEmail()));
			return new ResponseEntity<>(_testUser, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/testUser/{id}")
	public ResponseEntity<TestUser> updateTestUser(@PathVariable("id") Integer id, @RequestBody TestUser testUser) {
		Optional<TestUser> tutorialData = testUserRepo.findById(id);

		if (tutorialData.isPresent()) {
			TestUser _testUser = tutorialData.get();
			_testUser.setId(testUser.getId());
			_testUser.setUsername(testUser.getUsername());
			_testUser.setEmail(testUser.getEmail());
			return new ResponseEntity<>(testUserRepo.save(_testUser), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/testUser/{id}")
	public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Integer id) {
		try {
			testUserRepo.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/testUser")
	public ResponseEntity<HttpStatus> deleteAllTutorials() {
		try {
			testUserRepo.deleteAll();
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}
}