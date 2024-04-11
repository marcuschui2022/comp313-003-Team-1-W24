package com.foodista.services;

import com.foodista.dto.CommentRequest;
import com.foodista.dto.CommentResponse;
import com.foodista.entities.CommentDetail;
import com.foodista.entities.Post;
import com.foodista.entities.User;
import com.foodista.repositories.CommentRepository;
import com.foodista.repositories.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CommentService {

    @Autowired
    private final CommentRepository commentRepository;
    @Autowired
    private PostRepository postRepository;
    private final JwtService jwtService;

    public List<CommentResponse> getCommentsByPostId(long postId) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy HH:mm");
        List<CommentDetail> commentDetails = commentRepository.findByPostPostId(postId);
        Collections.sort(commentDetails, Comparator.comparing(CommentDetail::getCommentId).reversed());
        return commentDetails.stream().map(detail -> CommentResponse.builder()
                        .comment_id(detail.getCommentId())
                        .comment(detail.getCommentContent())
                        .user_id(detail.getUser().getUserId())
                        .full_name(detail.getUser().getFullName())
                        .create_at(detail.getCreate_at().toLocalDateTime().format(formatter))
                        .build())
                .collect(Collectors.toList());
    }


    public CommentDetail addComment(CommentRequest commentRequest, Long postId, String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);
        Optional<Post> existingPost = postRepository.findById(postId);

        if (foundUser.isPresent() && existingPost.isPresent()) {
            CommentDetail commentDetail = new CommentDetail();
            commentDetail.setUser(foundUser.get());
            commentDetail.setPost(existingPost.get());
            commentDetail.setCommentContent(commentRequest.getCommentContent());
            return commentRepository.save(commentDetail);
        }

        throw new RuntimeException("User or Post does not exist");
    }


    public void deleteComment(Long commentId, String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);
        Optional<CommentDetail> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isPresent()) {
            CommentDetail comment = commentOptional.get();

            if (foundUser.isPresent() && comment.getUser().getUserId().equals(foundUser.get().getUserId())) {
                commentRepository.deleteById(commentId);
            } else {
                throw new IllegalArgumentException("User is not the owner of the comment with id " + commentId);
            }
        } else {
            throw new IllegalArgumentException("Comment with id " + commentId + " does not exist");
        }
    }


    public void updateComment(Long commentId, CommentRequest commentRequest, String jwtToken) {
        Optional<User> foundUser = jwtService.extractUserDetails(jwtToken);
        Optional<CommentDetail> commentOptional = commentRepository.findById(commentId);

        if (commentOptional.isPresent()) {
            CommentDetail comment = commentOptional.get();

            if (foundUser.isPresent() && comment.getUser().getUserId().equals(foundUser.get().getUserId())) {
                comment.setCommentContent(commentRequest.getCommentContent());
                commentRepository.save(comment);
            } else {
                throw new IllegalArgumentException("User is not the owner of the comment with id " + commentId);
            }
        } else {
            throw new IllegalArgumentException("Comment with id " + commentId + " does not exist");
        }
    }

}