package com.foodista.services;

import com.foodista.dto.PostRequest;
import com.foodista.entities.*;
import com.foodista.repositories.BlogRepository;
import com.foodista.repositories.CategoryDetailRepository;
import com.foodista.repositories.PostRepository;
import com.foodista.repositories.PostTypeRepository;
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

//    public Post save(final Post post) {
//        // System.out.println("post");
//        // System.out.println(post);
//        return postRepository.save(post);
//    }

    public Post save(PostRequest postRequest, String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);

        // Fetch the Blog entity using postRequest's blog_id
        // Replace this with your actual code to fetch Blog entity
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

            Post newPost = new Post();
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

    public Optional<Post> delete(final Long id) {
        Optional<Post> postToBeDeleted = getById(id);

        if (postToBeDeleted.isPresent()) {
            postRepository.delete(postToBeDeleted.get());
        }

        return postToBeDeleted;
    }


}