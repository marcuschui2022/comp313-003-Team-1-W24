package com.foodistaws.controller;

import com.foodistaws.entity.Post;
import com.foodistaws.service.PostService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {
    final
    PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }


    @PostMapping("/")
    Post createPost(@RequestBody Post newPost){
        return postService.create(newPost);
    }

    @GetMapping("/{id}")
    Post readOnePost(@PathVariable String id){
        return postService.readOne(id);
    }

    @GetMapping("/")
    List<Post> readAllPost(){
        return postService.readAll();
    }

    @PutMapping("/{id}")
    Post updatePost(@RequestBody Post newPost, @PathVariable String id){
        return postService.update(newPost,id);
    }

    @DeleteMapping("/{id}")
    void deletePost(@PathVariable String id){
        postService.delete(id);
    }
}
