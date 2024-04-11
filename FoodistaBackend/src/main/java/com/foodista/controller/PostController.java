package com.foodista.controller;

import com.foodista.FoodistaBackendApplication;
import com.foodista.dto.PostRequest;
import com.foodista.dto.PostResponse;
import com.foodista.entities.Post;
import com.foodista.repositories.CategoryDetailRepository;
import com.foodista.repositories.PostTypeRepository;
import com.foodista.repositories.UserRepository;
import com.foodista.services.BlogService;
import com.foodista.services.JwtService;
import com.foodista.services.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post")
public class PostController extends FoodistaBackendApplication.BaseController {

    @Autowired
    private final PostService postService;
    private final BlogService blogService;
    private final JwtService jwtService;

    private final UserRepository userRepository;
    private final CategoryDetailRepository categoryDetailRepository;
    private final PostTypeRepository postTypeRepository;

    @GetMapping("/")
    public ResponseEntity<List<PostResponse>> getAllPost() {

        try {
            List<Post> posts = postService.getAll();
            List<PostResponse> postResponses = new ArrayList<>();

            if (posts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            DateFormat df = new SimpleDateFormat("dd MMM yyyy");

            for (Post post : posts) {
                PostResponse postResponse = PostResponse.builder()
                        .post_Id(post.getPostId())
                        .blog_id(post.getBlog().getBlogId())
                        .author(post.getBlog().getUser().getFullName())
                        .publishDate(df.format(post.getPublishDate()))
                        .post_content(post.getPostContent())
                        .category(post.getCategory())
                        .postType(post.getPostType())
                        .post_description(post.getPostDescription())
                        .post_profile_picture_url(post.getPostProfilePictureURL())
                        .user_Id(post.getBlog().getUser().getUserId())
                        .build();

                postResponses.add(postResponse);
            }

            return new ResponseEntity<>(postResponses, HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/user/")
    public ResponseEntity<List<PostResponse>> getAllPostByUserId(@ModelAttribute("jwtToken") String jwtToken) {
        try {
            List<Post> posts = postService.getAllPostsByUserId(jwtToken);

            DateFormat df = new SimpleDateFormat("dd MMM yyyy");
            List<PostResponse> postResponses = new ArrayList<>();
            for (Post post : posts) {
                PostResponse postResponse = PostResponse.builder()
                        .post_Id(post.getPostId())
                        .blog_id(post.getBlog().getBlogId())
                        .author(post.getBlog().getUser().getFullName())
                        .publishDate(df.format(post.getPublishDate()))
                        .post_content(post.getPostContent())
                        .category(post.getCategory())
                        .postType(post.getPostType())
                        .post_description(post.getPostDescription())
                        .post_profile_picture_url(post.getPostProfilePictureURL())
                        .user_Id(post.getBlog().getUser().getUserId())
                        .build();
                postResponses.add(postResponse);
            }

            return new ResponseEntity<>(postResponses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<PostResponse> getPostById(@PathVariable("id") Long id) {
        Optional<Post> postData = postService.getById(id);

        if (postData.isPresent()) {
            Post post = postData.get();

            DateFormat df = new SimpleDateFormat("dd MMM yyyy");
            PostResponse postResponse = PostResponse.builder()
                    .post_Id(post.getPostId())
                    .blog_id(post.getBlog().getBlogId())
                    .author(post.getBlog().getUser().getFullName())
                    .publishDate(df.format(post.getPublishDate()))
                    .post_content(post.getPostContent())
                    .category(post.getCategory())
                    .postType(post.getPostType())
                    .post_description(post.getPostDescription())
                    .post_profile_picture_url(post.getPostProfilePictureURL())
                    .user_Id(post.getBlog().getUser().getUserId())
                    .build();

            return new ResponseEntity<>(postResponse, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    @PostMapping("/")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, @ModelAttribute("jwtToken") String jwtToken) {
        try {
            System.out.println(postRequest);
            Post newPost = postService.saveAndUpdate(postRequest, jwtToken);

            return new ResponseEntity<>(newPost, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@ModelAttribute("jwtToken") String jwtToken, @PathVariable("id") Long id) {
        try {
            String response = postService.delete(jwtToken, id);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
