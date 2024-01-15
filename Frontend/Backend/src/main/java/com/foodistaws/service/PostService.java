package com.foodistaws.service;

import com.foodistaws.entity.Blog;
import com.foodistaws.entity.Post;
import com.foodistaws.exception.PostNotFoundException;
import com.foodistaws.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostService {
    private final PostRepository repository;
    private final BlogService blogService;

    //    public PostService(PostRepository repository) {
//        this.repository = repository;
////        this.blogService = blogService;
//    }
    public PostService(PostRepository repository, BlogService blogService) {
        this.repository = repository;
        this.blogService = blogService;
    }

    public Post create(Post newPost) {
        return repository.save(newPost);
    }

    public Post createPostByUserPostId(String blogId, Post newPost) {
        Blog existsBlog = blogService.readOne(blogId);
        newPost.setBlog(existsBlog);
        return repository.save(newPost);
    }

    public Post readOne(String id) {
        return repository.findById(id)
                .orElseThrow(() -> new PostNotFoundException(id));
    }

    public List<Post> readAll() {
        return repository.findAll();
    }

    public Post update(Post newPost, String id) {
        return repository.findById(id)
                .map(post -> {
                    post.setBlog(newPost.getBlog());
                    post.setTitle(newPost.getTitle());
                    post.setAuthor(newPost.getAuthor());
                    post.setPubDate(newPost.getPubDate());
                    post.setCategory(newPost.getCategory());
                    post.setCookingStyle(newPost.getCookingStyle());
                    post.setCookingType(newPost.getCookingType());
                    return repository.save(post);
                }).orElseGet(() -> {
                    newPost.setPostID(id);
                    return repository.save(newPost);
                });
    }

    public void delete(String id) {
        repository.deleteById(id);
    }
}
