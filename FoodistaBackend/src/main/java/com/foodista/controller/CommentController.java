package com.foodista.controller;

import com.foodista.dto.CommentRequest;
import com.foodista.entities.CommentDetail;
import com.foodista.services.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/post/{postId}/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;


    @GetMapping()
    public List<CommentDetail> getComments(@PathVariable String postId, @RequestBody CommentRequest commentRequest) {
        return commentService.findAllComments(postId, commentRequest.getUserId());
    }


    @PostMapping()
    public CommentDetail addComment(@PathVariable String postId, @RequestBody CommentRequest commentRequest){
        CommentDetail newComment = new CommentDetail(commentRequest.getCommentContent(), Integer.parseInt(postId), Integer.parseInt(commentRequest.getUserId()));
        return commentService.addComment(newComment);
    }

    @GetMapping("/{commentId}")
    public CommentDetail getComment(@PathVariable String commentId) {
        Optional<CommentDetail> comment = commentService.findComment((long)Integer.parseInt(commentId));
        if(comment.isPresent()) {
            CommentDetail commentFound = comment.get();
            return commentFound;
        } else {
            return null;
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
