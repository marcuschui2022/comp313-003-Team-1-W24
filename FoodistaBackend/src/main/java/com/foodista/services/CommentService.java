package com.foodista.services;

import com.foodista.dto.CommentRequest;
import com.foodista.entities.CommentDetail;
import com.foodista.repositories.CommentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;

    public List<CommentDetail> findAllComments(String userId, String postId ){
        return commentRepository.findAllComment(Integer.parseInt(userId),Integer.parseInt(postId));
    }

    public CommentDetail addComment(CommentDetail commentDetail) {
        return commentRepository.save(commentDetail);
    }

    public Optional<CommentDetail> findComment(Long commentId) {
        return commentRepository.findById(commentId);
    }

    public CommentDetail updateComment(CommentDetail commentDetail){
        return commentRepository.save(commentDetail);
    }

    public void deleteComment(String commentId) {
        commentRepository.deleteById((long) Integer.parseInt(commentId));
    }


}
