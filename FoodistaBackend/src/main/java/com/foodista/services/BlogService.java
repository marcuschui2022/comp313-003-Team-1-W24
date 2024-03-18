package com.foodista.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.foodista.entities.Blog;
import com.foodista.repositories.BlogRepository;
import com.foodista.dto.BlogRequest;

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
        //System.out.println(blogs);
        return blogs;
    }


    public List<Blog> getByUserId(final Integer user_id) {

        List<Blog> blogs = new ArrayList<Blog>();
        // System.out.println("getUser1");

        blogRepository.findByUserID(user_id).forEach(blogs::add);
        System.out.println(blogs);
        // System.out.println("getUser2");

        return blogs;
    }

    public Optional<Blog> getById(final Integer id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> update(final Integer id, final BlogRequest blog) {
        Integer user_id = Integer.valueOf(blog.getUser_id());

        return blogRepository.findByIDAndUserID(id,user_id).map(existingBlog -> {
            if (existingBlog != null) {
                existingBlog.setTitle(blog.getTitle());
                existingBlog.setBlogDescription(blog.getBlog_description());
                return blogRepository.save(existingBlog);
            } else {
                return null;
            }
        });
    }

    public Blog save(final Blog blog) {
        // System.out.println("blog");
        // System.out.println(blog);
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