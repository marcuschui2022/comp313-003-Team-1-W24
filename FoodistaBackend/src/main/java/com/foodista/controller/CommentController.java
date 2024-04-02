package com.foodista.controller;

import com.foodista.FoodistaBackendApplication;
import com.foodista.dto.CommentRequest;
import com.foodista.entities.CommentDetail;
import com.foodista.entities.User;
import com.foodista.services.CommentService;
import com.foodista.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post/{postId}/comments")
public class CommentController extends FoodistaBackendApplication.BaseController {

    @Autowired
    private CommentService commentService;
    private final JwtService jwtService;


    @GetMapping()
    public List<CommentDetail> getComments(@PathVariable String postId) {
        return commentService.findAllComments(Integer.parseInt(postId));
    }


    @PostMapping()
    public CommentDetail addComment(@PathVariable String postId, @RequestBody CommentRequest commentRequest,@RequestHeader(value = "Authorization", required = false) String token){
        final int[] tokenUserId = {-1};

        if (token != null && !token.isEmpty()) {
            token = token.split(" ")[1];
            String tmp = jwtService.extractUserId(token);
            tokenUserId[0] = Integer.valueOf(tmp);
        }

            CommentDetail newComment = new CommentDetail(commentRequest.getCommentContent(), Integer.parseInt(postId), tokenUserId[0]);
            return commentService.addComment(newComment);
    }

    @GetMapping("/{commentId}")
    public ResponseEntity<CommentDetail> getComment(@PathVariable String commentId) {
        Optional<CommentDetail> comment = commentService.findComment((long)Integer.parseInt(commentId));
        if(comment.isPresent()) {
            CommentDetail commentFound = comment.get();
            return new ResponseEntity<>(commentFound, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
    }

    @PutMapping("/{commentId}")
    public void updateComment(@PathVariable String commentId, @RequestBody CommentRequest commentRequest) {

        Optional<CommentDetail> commentToUpdate = commentService.findComment((long)Integer.parseInt(commentId));
        if(commentToUpdate.isPresent()) {
            CommentDetail updatedComment = commentToUpdate.get();
            updatedComment.setCommentContent(commentRequest.getCommentContent());
            commentService.updateComment(updatedComment);
        } else {
            throw new Error("Comment not found!");
        }
    }

    @DeleteMapping("/{commentId}")
    public void deleteComment(@PathVariable String commentId){
        commentService.deleteComment(commentId);
    }
}
