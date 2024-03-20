package com.foodista.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.foodista.entities.Post;
import com.foodista.repositories.PostRepository;
import com.foodista.dto.PostRequest;

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
public class PostService {

    @Autowired
    private PostRepository postRepository;
    private BlogRepository blogRepository;

    public List<Post> getAll() {
        // System.out.println("getALLPost");

        List<Post> posts = new ArrayList<Post>();
        System.out.println(posts);

        postRepository.findAllPost().forEach(posts::add);
        // System.out.println("finish");
        return posts;
    }

    public List<Post> getByUserId(final Integer user_id) {

        List<Post> posts = new ArrayList<Post>();
        System.out.println("getPostByUserId1");
        List<Long> blogIdsArray = new ArrayList<Long>();
        blogRepository.findByUserID(user_id).forEach(blog -> {
            blogIdsArray.add(blog.getBlogId());
        });

        postRepository.findByBlogIds(blogIdsArray).forEach(posts::add);
        // System.out.println(posts);
        System.out.println("getPostByUserId2");

        return posts;
    }

    public List<Post> getByBlogId(final Integer blog_id) {

        List<Post> posts = new ArrayList<Post>();
        // System.out.println("getPostByBlogId1");

        postRepository.findByBlogID(blog_id).forEach(posts::add);
        System.out.println(posts);
        // System.out.println("getPostByBlogId2");

        return posts;
    }

    public Optional<Post> getById(final Integer id) {
        return postRepository.findById(id);
    }

    // public Optional<Post> update(final Integer id, final PostRequest post) {

    //     // return postRepository.findById(id).map(existingPost -> {
    //     //     if (existingPost != null) {
    //     //         existingPost.setPostContent(post.getPostContent());
    //     //         return postRepository.save(existingPost);
    //     //     } else {
    //     //         return null;
    //     //     }
    //     // });
    // }

    public Post save(final Post post) {
        // System.out.println("post");
        // System.out.println(post);
        return postRepository.save(post);
    }

    public Optional<Post> delete(final Integer id) {
        Optional<Post> postToBeDeleted = getById(id);

        if (postToBeDeleted.isPresent()) {
            postRepository.delete(postToBeDeleted.get());
        }

        return postToBeDeleted;
    }


}