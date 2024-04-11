package com.foodista.services;

import com.foodista.dto.PostRequest;
import com.foodista.entities.*;
import com.foodista.repositories.*;
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
public class PostService {

    @Autowired
    private PostRepository postRepository;
    private BlogRepository blogRepository;
    private CategoryDetailRepository categoryDetailRepository;
    private PostTypeRepository postTypeRepository;
    private CommentRepository commentRepository;
    private final JwtService jwtService;

    public List<Post> getAll() {
        // System.out.println("getALLPost");

        List<Post> posts = new ArrayList<Post>();
        // System.out.println(posts);

        postRepository.findAllPost().forEach(posts::add);
        // System.out.println("finish");
        return posts;
    }

    public List<Post> getByUserId(final Long user_id) {

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

    public List<Post> getByBlogId(final Long blog_id) {

        List<Post> posts = new ArrayList<Post>();
        // System.out.println("getPostByBlogId1");

        postRepository.findByBlogID(blog_id).forEach(posts::add);
        // System.out.println(posts);
        // System.out.println("getPostByBlogId2");

        return posts;
    }

    public Optional<Post> getById(final Long id) {
        return postRepository.findById(id);
    }


    public Post saveAndUpdate(PostRequest postRequest, String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);
        Optional<Post> existingPost = postRepository.findById(postRequest.getPost_Id());

        // If the post exist, check if the current user is the owner of the post
        if (existingPost.isPresent() && !existingPost.get().getBlog().getUser().getId().equals(foundUser.get().getUserId())) {
            throw new IllegalArgumentException("The post does not belong to the current user");
        }

        // Fetch the Blog entity using postRequest's blog_id
        Optional<Blog> foundBlog = blogRepository.findById(postRequest.getBlog_id());

        // Fetch the CategoryDetail entity using postRequest's category_id
        Optional<CategoryDetail> foundCategory = categoryDetailRepository.findById(postRequest.getCategory_id());

        // Fetch the PostType entity using postRequest's post_type_id
        Optional<PostType> foundPostType = postTypeRepository.findById(postRequest.getPost_type_id());

        if (foundUser.isPresent() && foundBlog.isPresent() && foundCategory.isPresent() && foundPostType.isPresent()) {
            User user = foundUser.get();
            Blog blog = foundBlog.get();
            CategoryDetail category = foundCategory.get();
            PostType postType = foundPostType.get();

            // Check if the user is owner of the blog
            if (!blog.getUser().equals(user)) {
                throw new RuntimeException("User is not owner of the blog");
            }

            Post newPost = existingPost.orElse(new Post());

            // Set newPost properties here
            newPost.setBlog(blog);
            newPost.setCategory(category);
            newPost.setPostType(postType);
            newPost.setPostContent(postRequest.getPost_content());
            newPost.setPostDescription(postRequest.getPost_description());
            newPost.setPostProfilePictureURL(postRequest.getPost_profile_picture_url());

            return postRepository.save(newPost);
        }

        throw new RuntimeException("User, blog, category, or post type not found");
    }


    public List<Post> getAllPostsByUserId(String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);
        if (foundUser.isPresent()) {
            Long userId = foundUser.get().getId();
            return postRepository.findAllPostsByUserId(userId);
        } else {
            throw new IllegalArgumentException("Invalid JWT Token");
        }
    }


    @Transactional
    public String delete(String jwtToken, Long id) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);

        if (foundUser.isPresent()) {
            Long userId = foundUser.get().getId();
            Optional<Post> postOptional = postRepository.findById(id);

            if (postOptional.isPresent()) {
                Post post = postOptional.get();

                // Check if the post belongs to the logged in user
                if (post.getBlog().getUser().getId().equals(userId)) {
                    // Delete all related comments first
                    List<CommentDetail> comments = commentRepository.findByPostPostId(id);
                    commentRepository.deleteAll(comments);

                    // Now delete the post
                    postRepository.delete(post);

                    return "Post deleted successfully";
                } else {
                    throw new IllegalArgumentException("The post does not belong to the logged in user");
                }
            } else {
                throw new IllegalArgumentException("Post not found");
            }
        } else {
            throw new IllegalArgumentException("Invalid JWT Token");
        }
    }


}