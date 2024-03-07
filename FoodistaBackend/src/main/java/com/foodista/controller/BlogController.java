package com.foodista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.prepost.PreAuthorize;


import com.foodista.entities.Blog;
import com.foodista.services.BlogService;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("/")
    public ResponseEntity<List<Blog>> getAllBlog(@RequestParam(required = false) String title) {
        try {
            List<Blog> blogs = new ArrayList<Blog>();

            blogService.getAll().forEach(blogs::add);

            if (blogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<Blog>> getAllBlogsByUser(@PathVariable("user_id") Integer userId) {
        try {
            List<Blog> blogs = new ArrayList<Blog>();

            blogService.getByUserId(userId).forEach(blogs::add);

            if (blogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable("id") Integer id) {
        Optional<Blog> blog = blogService.getById(id);

        if (blog.isPresent()) {
            return new ResponseEntity<>(blog.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<Blog> createBlog(@RequestBody Blog newblog) {
        try {
            Blog _blog = blogService.save(newblog);
            return new ResponseEntity<>(_blog, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable("id") Integer id, @RequestBody Blog blog) {
        Optional<Blog> tutorialData = blogService.getById(id);

        if (tutorialData.isPresent()) {
            Blog _blog = tutorialData.get();
            _blog.setBlogId(blog.getBlogId());
            _blog.setTitle(blog.getTitle());
            _blog.setBlogDescription(blog.getBlogDescription());
            return new ResponseEntity<>(blogService.save(_blog), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteTutorial(@PathVariable("id") Integer id) {
        try {
            blogService.delete(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
