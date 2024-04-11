package com.foodista.controller;

import com.foodista.FoodistaBackendApplication;
import com.foodista.dto.CommentRequest;
import com.foodista.dto.CommentResponse;
import com.foodista.entities.CommentDetail;
import com.foodista.services.CommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/comment")
public class CommentController extends FoodistaBackendApplication.BaseController {

    @Autowired
    private CommentService commentService;
//    private final JwtService jwtService;

    @GetMapping("/")
    public String Hello() {
        return "hi";
    }


    @GetMapping("/post/{postId}")
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable Long postId) {
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    @PostMapping("/post/{postId}")
    public ResponseEntity<CommentDetail> addComment(@RequestBody CommentRequest commentRequest,
                                                    @PathVariable Long postId,
                                                    @ModelAttribute("jwtToken") String jwtToken) {
        try {
            CommentDetail commentDetail = commentService.addComment(commentRequest, postId, jwtToken);
            return new ResponseEntity<>(commentDetail, HttpStatus.CREATED);
        } catch (Exception e) {
//            e.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{commentId}")
    public ResponseEntity deleteComment(@PathVariable Long commentId,
                                        @ModelAttribute("jwtToken") String jwtToken) {
        try {
            commentService.deleteComment(commentId, jwtToken);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/{commentId}")
    public ResponseEntity<CommentDetail> updateComment(@RequestBody CommentRequest commentRequest,
                                                       @PathVariable Long commentId,
                                                       @ModelAttribute("jwtToken") String jwtToken) {
        try {
            commentService.updateComment(commentId, commentRequest, jwtToken);
            return new ResponseEntity<>(HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
