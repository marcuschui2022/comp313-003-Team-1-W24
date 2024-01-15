package com.foodistaws.service;

import com.foodistaws.entity.Blog;
import com.foodistaws.exception.BlogNotFoundException;
import com.foodistaws.repository.BlogRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlogService {
    private final BlogRepository repository;

    public BlogService(BlogRepository repository) {
        this.repository = repository;
    }

    public Blog create(Blog newBlog){
        return repository.save(newBlog);
    }

    public Blog readOne(String id){
        return repository.findById(id)
                .orElseThrow(() -> new BlogNotFoundException(id));
    }

    public List<Blog> readAll(){
        return repository.findAll();
    }

    public Blog update(Blog newBlog, String id){
        return repository.findById(id)
                .map(blog -> {
                    blog.setUser(newBlog.getUser());
                    blog.setTitle(newBlog.getTitle());
                    blog.setDescription(newBlog.getDescription());
                    return repository.save(blog);
                }).orElseGet(() -> {
                    newBlog.setBlogID(id);
                    return repository.save(newBlog);
                });
    }

    public void delete(String id){
        repository.deleteById(id);
    }
}
