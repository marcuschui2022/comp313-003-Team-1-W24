package com.foodista.services;

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

    public List<CommentDetail> findAllComments(int postId ){
        return commentRepository.findAllComment(postId);
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
