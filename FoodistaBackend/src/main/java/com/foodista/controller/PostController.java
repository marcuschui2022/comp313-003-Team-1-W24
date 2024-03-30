package com.foodista.controller;

import com.foodista.FoodistaBackendApplication;
import com.foodista.dto.BlogRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;

import com.foodista.entities.Post;
import com.foodista.services.PostService;
import com.foodista.dto.PostRequest;
import com.foodista.dto.PostResponse;

import com.foodista.entities.Blog;
import com.foodista.entities.User;
import com.foodista.entities.CategoryDetail;
import com.foodista.entities.PostType;

import com.foodista.services.BlogService;
import com.foodista.services.JwtService;

import com.foodista.repositories.UserRepository;
import com.foodista.repositories.CategoryDetailRepository;
import com.foodista.repositories.PostTypeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.sql.Timestamp;

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
    public ResponseEntity<List<PostResponse>> getAllNormalPost(@RequestParam(required = false) String title) {
        System.out.println("get_all_normal_post_1");
        try {

            List<PostResponse> posts = new ArrayList<PostResponse>();
            System.out.println("get_all_post_2");

            postService.getAll().forEach(post -> {
                // System.out.println("getBlogId"+blog.getBlogId());
                // System.out.println("getUser"+blog.getUser().getId());
                if (post.getPostType().getPostTypeId() == 1) {
                    PostResponse response = new PostResponse(
                            post.getPostId(),
                            post.getBlog().getBlogId(),
//                            post.getAuthor(),
                            post.getPublishDate() + "",
                            "",
                            post.getCategory(),
                            post.getPostType());

                    posts.add(response);
                }
            });
            // System.out.println("get_all_3");

            if (posts.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            // System.out.println("get_all_4");

            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{user_id}")
    public ResponseEntity<List<PostResponse>> getAllPostByUser(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("user_id") Long userId) {
        try {
            System.out.println("getByUser_1");
            List<PostResponse> posts = new ArrayList<PostResponse>();

            final int[] tokenUserId = {-1};

            if (token != null && !token.isEmpty()) {
                token = token.split(" ")[1];
                //  System.out.println(token);
                String tmp = jwtService.extractUserId(token);
                tokenUserId[0] = Integer.valueOf(tmp);

                // System.out.println(tokenUserId);
                // System.out.println("getByUser_2");
                // System.out.println(userId);
            }
            // System.out.println("getByUser_2");

            postService.getByUserId(userId).forEach(post -> {
                // System.out.println("getByUser_3");
                // System.out.println(tokenUserId == userId);

                if (post.getPostType().getPostTypeId() == 1 || tokenUserId[0] == userId) {
                    PostResponse response = new PostResponse(
                            post.getPostId(),
                            post.getBlog().getBlogId(),
//                            post.getAuthor(),
                            post.getPublishDate() + "",
                            post.getPostContent(),
                            post.getCategory(),
                            post.getPostType());

                    posts.add(response);
                }
            });

            if (posts.isEmpty()) {
                System.out.println("getByUser_Empty");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/blog/{blog_id}")
    public ResponseEntity<List<PostResponse>> getAllPostByBlogId(@RequestHeader(value = "Authorization", required = false) String token, @PathVariable("blog_id") Long blogId) {
        try {
            System.out.println("getByBlog_1");
            List<PostResponse> posts = new ArrayList<PostResponse>();

            final int[] tokenUserId = {-1};

            if (token != null && !token.isEmpty()) {
                token = token.split(" ")[1];
                //  System.out.println(token);
                String tmp = jwtService.extractUserId(token);
                tokenUserId[0] = Integer.valueOf(tmp);

                // System.out.println(tokenUserId);
                // System.out.println("getByUser_2");
                // System.out.println(userId);
            }
            // System.out.println("getByUser_2");
            Optional<Blog> tmpBlog = blogService.getById(blogId);
            if (!tmpBlog.isPresent()) {
                System.out.println("getByBlog_no_blog");
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
            Blog blog = tmpBlog.get();
            Long userId = blog.getUser().getId();

            postService.getByBlogId(blogId).forEach(post -> {
                // System.out.println("getByUser_3");
                // System.out.println(tokenUserId == userId);

                if (post.getPostType().getPostTypeId() == 1 || tokenUserId[0] == userId) {
                    PostResponse response = new PostResponse(
                            post.getPostId(),
                            post.getBlog().getBlogId(),
//                            post.getAuthor(),
                            post.getPublishDate() + "",
                            "",
                            post.getCategory(),
                            post.getPostType());

                    posts.add(response);
                }
            });

            if (posts.isEmpty()) {
                System.out.println("getByBlog_Empty");
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }

            return new ResponseEntity<>(posts, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Post> getBlogById(@PathVariable("id") Long id) {
        Optional<Post> post = postService.getById(id);
        //  System.out.println(blog);

        if (post.isPresent()) {
            Post response = post.get();
            response.getBlog().setUser(null);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    //    @PostMapping("/")
//    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, @ModelAttribute("jwtToken") String jwtToken) {
//        try {
//            Post createdBlog = Post.builder()
//                    .title(blogRequest.getTitle())
//                    .blogDescription(blogRequest.getBlog_description())
//                    .build();
//
//            Post blog = blogService.save(createdBlog, jwtToken);
//
//
//            return new ResponseEntity<>(blog, HttpStatus.CREATED);
//        } catch (Exception e) {
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @PostMapping("/")
    public ResponseEntity<Post> createPost(@RequestBody PostRequest postRequest, @ModelAttribute("jwtToken") String jwtToken) {
        try {
            Post newPost = postService.save(postRequest, jwtToken);

            return new ResponseEntity<>(newPost, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
//    @PostMapping("/")
//    public ResponseEntity<PostResponse> createBlog(@RequestHeader(value = "Authorization", required = true) String token, @RequestBody PostRequest newpost) {
//        try {
//            //chech the user id from token and the user id from the post
//            token = token.split(" ")[1];
//            String tokenUserId = jwtService.extractUserId(token);
//
//            System.out.println("createBlog_1");
//            Long user_id = Long.valueOf(tokenUserId);
//            Optional<User> user = userRepository.findById(user_id);
//
//            System.out.println("createBlog_get_User");
//            if (!user.isPresent()) {
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            }
//            String author = user.get().getFullName();
//
//            System.out.println("createBlog_get_blog");
//            Long blog_id = newpost.getBlog_id();
//            Blog blog = new Blog();
//            if (blog_id == null) {
//                System.out.println("createBlog_find_or_create_default_blog");
//                blog = blogService.findOrCreateDeflautBlog(user.get());
//            } else {
//                System.out.println("createBlog_find_blog");
//                Optional<Blog> tmpBlog = blogService.getById(blog_id);
//                if (!tmpBlog.isPresent()) {
//                    System.out.println("createBlog_no_blog");
//                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//                } else {
//                    blog = tmpBlog.get();
//                    if (blog.getUser().getId() != user_id) {
//                        System.out.println("createBlog_the_blog_user_not_match");
//                        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//                    }
//                }
//            }
//
//            System.out.println("createBlog_get_catergory");
//            Long category_id = Long.valueOf(newpost.getCategory_id());
//
//            CategoryDetail category = new CategoryDetail();
//            Optional<CategoryDetail> tmpCategory = categoryDetailRepository.findById(category_id);
//
//            if (!tmpCategory.isPresent()) {
//                System.out.println("createBlog_no_catergory");
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            } else {
//                category = tmpCategory.get();
//            }
//
//            System.out.println("createBlog_get_post_type");
//            Long post_type_id = newpost.getPost_type_id();
//
//
//            PostType postType = new PostType();
//            Optional<PostType> tmpPostType = postTypeRepository.findById(post_type_id);
//
//            if (!tmpPostType.isPresent()) {
//                System.out.println("createBlog_no_post_type");
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            } else {
//                postType = tmpPostType.get();
//            }
//
//
//            Timestamp timestamp = new Timestamp(System.currentTimeMillis()); // Current timestamp
//
//            System.out.println("createBlog_newPostContent");
//            Post newPostContent = Post.builder()
//                    .postContent(newpost.getPost_content())
//                    .blog(blog)
//                    .category(category)
//                    .postType(postType)
////                    .author(author)
//                    .publishDate(timestamp)
//                    .build();
//            Post createdPost = postService.save(newPostContent);
//
//
//            if (createdPost == null) {
//                System.out.println("createBlog_no_post");
//                return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
//            } else {
//                PostResponse responsePost = new PostResponse(
//                        createdPost.getPostId(),
//                        blog.getBlogId(),
////                        author,
//                        timestamp + "",
//                        "success",
//                        category,
//                        postType
//                );
//
//                return new ResponseEntity<>(responsePost, HttpStatus.CREATED);
//            }
//
//        } catch (Exception e) {
//            // System.out.println(e);
//            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

//    @PutMapping("/{id}")
//    public ResponseEntity<PostResponse> updateBlog(@RequestHeader(value = "Authorization", required = true) String token, @PathVariable("id") Long id, @RequestBody PostRequest updatePost) {
//        Optional<Post> post = postService.getById(id);
//        //  System.out.println(blog);
//
//        if (post.isPresent()) {
//            Post response = post.get();
//
//            token = token.split(" ")[1];
//            String tokenUserId = jwtService.extractUserId(token);
//            Long tmpTokenUserId = Long.valueOf(tokenUserId);
//            Long original_user_id = response.getBlog().getUser().getId();
//            System.out.println(tokenUserId);
//            System.out.println(original_user_id);
//            System.out.println(tmpTokenUserId != original_user_id);
//
//
//            if (tmpTokenUserId != original_user_id) {
//                System.out.println("false token");
//                return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//            }
//            System.out.println("updatePost_Blog");
//
//            Long newBlogId = updatePost.getBlog_id();
//            //check blog id is changed
//            if (newBlogId != null && newBlogId > 0) {
//                Long oldBlogId = response.getBlog().getBlogId();
//
//                Long tmpBlogId = Long.valueOf(newBlogId);
//
//
//                System.out.println("updatePost_Blog");
//                System.out.println(oldBlogId == tmpBlogId);
//
//                if (oldBlogId != tmpBlogId && newBlogId != null) {
//                    System.out.println("updatePost_Blog_1");
//                    Optional<Blog> tmpBlog = blogService.getById(newBlogId);
//                    if (!tmpBlog.isPresent()) {
//                        System.out.println("updatePost_Blog_2");
//                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//                    } else {
//                        response.setBlog(tmpBlog.get());
//                        if (tmpBlog.get().getUser().getId() != original_user_id) {
//                            System.out.println("createBlog_the_blog_user_not_match");
//                            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
//                        }
//                    }
//                }
//            }
//
//
//            //check category id is changed
//            Long oldCategoryId = response.getCategory().getCategoryId();
//            Long newCategoryId = updatePost.getCategory_id();
//            Long tmpCategoryId = Long.valueOf(newCategoryId);
//
//            System.out.println("updatePost_Category");
//            System.out.println(oldCategoryId == tmpCategoryId);
//
//
//            if (oldCategoryId != tmpCategoryId && newCategoryId != null) {
//                System.out.println("updatePost_Categgory_1");
//                Optional<CategoryDetail> tmpCategory = categoryDetailRepository.findById(newCategoryId);
//                if (!tmpCategory.isPresent()) {
//                    System.out.println("updatePost_Categgory_2");
//                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//                } else {
//                    response.setCategory(tmpCategory.get());
//                }
//            }
//
//            //check post type id is changed
//            Long oldPostTypeId = response.getPostType().getPostTypeId();
//            Long newPostTypeId = updatePost.getPost_type_id();
//
//            if (oldPostTypeId != newPostTypeId && newPostTypeId != null) {
//                System.out.println("updatePost_PostType_1");
//                Optional<PostType> tmpPostType = postTypeRepository.findById(newPostTypeId);
//                if (!tmpPostType.isPresent()) {
//                    System.out.println("updatePost_PostType_2");
//                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//                } else {
//                    response.setPostType(tmpPostType.get());
//                }
//            }
//
//            response.setPostContent(updatePost.getPost_content());
//
//            postService.save(response);
//
//            PostResponse responsePost = new PostResponse(
//                    response.getPostId(),
//                    original_user_id,
////                    response.getAuthor(),
//                    response.getPublishDate() + "",
//                    "success",
//                    response.getCategory(),
//                    response.getPostType()
//            );
//
//
//            return new ResponseEntity<>(responsePost, HttpStatus.OK);
//        } else {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//
//    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity<HttpStatus> deleteBlog(@RequestHeader(value = "Authorization", required = true) String token, @PathVariable("id") Long id) {
//
//        try {
//            Optional<Post> post = postService.getById(id);
//
//            if (post.isPresent()) {
//                Post response = post.get();
//
//                token = token.split(" ")[1];
//                String tokenUserId = jwtService.extractUserId(token);
//                Long tmpTokenUserId = Long.valueOf(tokenUserId);
//                Long original_user_id = response.getBlog().getUser().getId();
//                System.out.println(tokenUserId);
//                System.out.println(original_user_id);
//                System.out.println(tmpTokenUserId != original_user_id);
//
//
//                if (tmpTokenUserId != original_user_id) {
//                    return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
//                }
//
//
//                Long archivePostId = 3L;
//
//                Optional<PostType> tmpPostType = postTypeRepository.findById(archivePostId);
//                response.setPostType(tmpPostType.get());
//
//                postService.save(response);
//                return new ResponseEntity<>(HttpStatus.OK);
//            } else {
//                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//            }
//        } catch (Exception e) {
//            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

}
