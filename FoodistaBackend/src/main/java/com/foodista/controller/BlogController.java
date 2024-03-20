package com.foodista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;

import com.foodista.entities.Blog;
import com.foodista.services.BlogService;
import com.foodista.dto.BlogRequest;
import com.foodista.dto.BlogResponse;

import com.foodista.entities.User;
import com.foodista.repositories.UserRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/blog")
public class BlogController {

    @Autowired
    private final BlogService blogService;
    private final UserRepository userRepository;

    @GetMapping("/")
    public ResponseEntity<List<BlogResponse>> getAllBlog(@RequestParam(required = false) String title) {
        // System.out.println("get_all_1");
        try {

            List<BlogResponse> blogs = new ArrayList<BlogResponse>();
            // System.out.println("get_all_2");

            blogService.getAll().forEach(blog -> {
            // System.out.println("getBlogId"+blog.getBlogId());
            // System.out.println("getUser"+blog.getUser().getId());

                BlogResponse responseBlog = new BlogResponse(
                    blog.getBlogId()+"",
                    blog.getTitle(),
                    blog.getBlogDescription(),
                    blog.getUser().getId()+"");
            
                blogs.add(responseBlog);

            });
            // System.out.println("get_all_3");

            if (blogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            // System.out.println("get_all_4");

            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<BlogResponse>> getAllBlogsByUser(@PathVariable("user_id") Integer userId) {
        try {
            List<BlogResponse> blogs = new ArrayList<BlogResponse>();
            // Long user_id = Long.valueOf(newblog.getUser_id());
            // Optional<User> user = userRepository.findById(user_id);

            blogService.getByUserId(userId).forEach(blog -> {
            // System.out.println("getBlogId"+blog.getBlogId());
            // System.out.println("getUser"+blog.getUser().getId());

                BlogResponse responseBlog = new BlogResponse(
                    blog.getBlogId()+"",
                    blog.getTitle(),
                    blog.getBlogDescription(),
                    blog.getUser().getId()+"");
            
                blogs.add(responseBlog);

            });

            if (blogs.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(blogs, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

     @GetMapping("/{id}")
    public ResponseEntity<BlogResponse> getBlogById(@PathVariable("id") Integer id) {
        Optional<Blog> blog = blogService.getById(id);
        //  System.out.println(blog);

        if (blog.isPresent()) {
            Blog tmp = blog.get();
            // System.out.println(tmp.getBlogId());
            BlogResponse responseBlog = new BlogResponse(
                tmp.getBlogId()+"",
                tmp.getTitle(),
                tmp.getBlogDescription(),
                tmp.getUser().getId()+"");

            return new ResponseEntity<>(responseBlog, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping("/")
    public ResponseEntity<BlogResponse> createBlog(@RequestBody BlogRequest newblog) {
        try {
            //  System.out.println("createBlog_1");
            Long user_id = Long.valueOf(newblog.getUser_id());
            Optional<User> user = userRepository.findById(user_id);
            // System.out.println(user);
            // System.out.println("createBlog_2");

            Blog createdBlog = Blog.builder()
                    .title(newblog.getTitle())
                    .blogDescription(newblog.getBlog_description())
                    .user(user.get())
                    .build();
            Blog _blog = blogService.save(createdBlog);

            BlogResponse responseBlog = new BlogResponse(
                _blog.getBlogId()+"",
                newblog.getTitle(),
                newblog.getBlog_description(),
                newblog.getUser_id()+"");

            return new ResponseEntity<>( responseBlog, HttpStatus.CREATED);
        } catch (Exception e) {
            // System.out.println(e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<BlogResponse> updateBlog(@PathVariable("id") Integer id, @RequestBody BlogRequest blog) {
        Optional<Blog> tutorialData = blogService.update(id, blog);

        if (tutorialData.isPresent()) {
            BlogResponse responseBlog = new BlogResponse(
                id+"",
                blog.getTitle(),
                blog.getBlog_description(),
                blog.getUser_id()+"");
            return new ResponseEntity<>(responseBlog, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBlog(@PathVariable("id") Integer id) {
        try {
            blogService.delete(id);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
