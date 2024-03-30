package com.foodista.services;

import com.foodista.dto.BlogRequest;
import com.foodista.entities.Blog;
import com.foodista.entities.User;
import com.foodista.repositories.BlogRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@AllArgsConstructor
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;
    private final JwtService jwtService;


    public List<Blog> getAll() {

        List<Blog> blogs = new ArrayList<Blog>();

        blogRepository.findAll().forEach(blogs::add);
        //System.out.println(blogs);
        return blogs;
    }


    public List<Blog> getByUserId(final Long user_id) {

        List<Blog> blogs = new ArrayList<Blog>();
        // System.out.println("getUser1");

        blogRepository.findByUserID(user_id).forEach(blogs::add);
        //System.out.println(blogs);
        // System.out.println("getUser2");

        return blogs;
    }

    public Optional<Blog> getById(final Long id) {
        return blogRepository.findById(id);
    }

    public Optional<Blog> update(final Long id, final BlogRequest blog) {
        Long user_id = blog.getUser_id();

        return blogRepository.findByIDAndUserID(id, user_id).map(existingBlog -> {
            if (existingBlog != null) {
                existingBlog.setTitle(blog.getTitle());
                existingBlog.setBlogDescription(blog.getBlog_description());
                return blogRepository.save(existingBlog);
            } else {
                return null;
            }
        });
    }

    public Blog save(final Blog blog, String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);

        if (foundUser.isPresent()) {
            User user = foundUser.get();
            blog.setUser(user);
            return blogRepository.save(blog);
        }

        throw new RuntimeException("User not found from provided JWT token");
    }

    public Optional<Blog> delete(final Long id) {
        Optional<Blog> blogToBeDeleted = getById(id);

        if (blogToBeDeleted.isPresent()) {
            blogRepository.delete(blogToBeDeleted.get());
        }

        return blogToBeDeleted;
    }

    public Blog findOrCreateDeflautBlog(User user) {
        Optional<Blog> defaultBlog = blogRepository.findByDefault();

        if (defaultBlog.isPresent()) {
            return defaultBlog.get();
        } else {
            Blog blog = new Blog();
            blog.setTitle("default");
            blog.setBlogDescription("default");
            blog.setUser(user);
            return blogRepository.save(blog);
        }
    }

}