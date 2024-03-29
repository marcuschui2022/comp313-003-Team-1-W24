package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
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

    @Column(name = "author")
    private String author;

    @Column(name = "publish_date")
    private Timestamp publishDate;

    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private CategoryDetail category;

    @Column(name = "post_content")
    @Lob
    private byte[] postContent;

    @ManyToOne
    @JoinColumn(name = "blog_id", nullable = false)
    private Blog blog;

    @ManyToOne
    @JoinColumn(name = "post_type_id", nullable = false)
    private PostType postType;

    // Getters and Setters
}