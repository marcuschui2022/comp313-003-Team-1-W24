package com.foodista.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Timestamp;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "POST")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    @Column(name = "post_profile_picture_url", nullable = false)
    String postProfilePictureURL;

    @Column(name = "post_description", nullable = false)
    String postDescription;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd MMM yyyy")
    @Column(name = "publish_date")
    private Timestamp publishDate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryDetail category;

    @Lob
    @Column(name = "post_content", columnDefinition = "TEXT")
    private String postContent;

    @ManyToOne
    @JoinColumn(name = "post_type_id", nullable = false)
    private PostType postType;

    @ManyToOne
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;

    @PrePersist
    public void onCreate() {
        publishDate = new Timestamp(System.currentTimeMillis());
    }

    // Getters and Setters
}