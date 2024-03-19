package com.foodista.repositories;

import com.foodista.entities.CommentDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CommentRepository extends JpaRepository<CommentDetail, Long> {
    @Query("SELECT c FROM CommentDetail c where c.userId=?1 and c.postId=?2")
    List<CommentDetail> findAllComment(int userId, int postId);

}
