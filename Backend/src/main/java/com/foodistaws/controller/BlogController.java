package com.foodistaws.controller;

import com.foodistaws.entity.Blog;
import com.foodistaws.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    final
    BlogService blogService;

    public BlogController(BlogService blogService) {
        this.blogService = blogService;
    }

    @PostMapping("/")
    Blog createBlog(@RequestBody Blog newBlog){
        return blogService.create(newBlog);
    }

    @GetMapping("/{id}")
    Blog readOneBlog(@PathVariable String id){
        return blogService.readOne(id);
    }

    @GetMapping("/")
    List<Blog> readAllBlogs(){
        return blogService.readAll();
    }

    @PutMapping("/{id}")
    Blog updateBlog(@RequestBody Blog newBlog, @PathVariable String id){
        return blogService.update(newBlog,id);
    }

    @DeleteMapping("/{id}")
    void deleteBlog(@PathVariable String id){
        blogService.delete(id);
    }
}
