package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Getter
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "CommentDetail")
@ToString
@Table(name = "comment_detail")
public class CommentDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    @Column(name = "comment_content", nullable = false)
    private String commentContent;

    @Column(name = "user_id", nullable = false)
    private int userId;

    @Column(name = "post_id", nullable = false)
    private int postId;

//    @ManyToOne
//    @JoinColumn(name = "user_id", nullable = false)
//    private User user;
//
//    @ManyToOne
//    @JoinColumn(name = "post_id", nullable = false)
//    private Post post;


    public CommentDetail(String commentContent, int userId, int postId) {
        this.commentContent = commentContent;
        this.userId = userId;
        this.postId = postId;
    }

    // Getters and Setters
    public Long getCommentId() {
        return commentId;
    }

    public void setCommentId(Long commentId) {
        this.commentId = commentId;
    }

    public String getCommentContent() {
        return commentContent;
    }

    public void setCommentContent(String commentContent) {
        this.commentContent = commentContent;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getPostId() {
        return postId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }
}