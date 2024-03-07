package com.foodista.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.foodista.entities.Blog;
import com.foodista.repositories.BlogRepository;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.AllArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

@Service
@Transactional
@AllArgsConstructor
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    
    public List<Blog> getAll() {

        List<Blog> blogs = new ArrayList<Blog>();

        blogRepository.findAll().forEach(blogs::add);

        return blogs;
    }


    public List<Blog> getByUserId(final Integer user_id) {

        List<Blog> blogs = new ArrayList<Blog>();

        blogRepository.findByUserID(user_id).forEach(blogs::add);

        return blogs;
    }

    public Optional<Blog> getById(final Integer id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> update(final Integer id, final Blog blog) {
        return blogRepository.findById(id).map(existingBlog -> {
            if (existingBlog != null) {
                existingBlog.setTitle(blog.getTitle());
                existingBlog.setBlogDescription(blog.getBlogDescription());
                return blogRepository.save(existingBlog);
            } else {
                return null;
            }
        });
    }

    public Blog save(final Blog blog) {
        return blogRepository.save(blog);
    }

    public Optional<Blog> delete(final Integer id) {
        Optional<Blog> blogToBeDeleted = getById(id);

        if (blogToBeDeleted.isPresent()) {
            blogRepository.delete(blogToBeDeleted.get());
        }

        return blogToBeDeleted;
    }


}