package com.foodista.repositories;

import com.foodista.entities.CommentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Transactional
public interface CommentRepository extends JpaRepository<CommentDetail, Long> {
    List<CommentDetail> findByPostPostId(Long postId);
}