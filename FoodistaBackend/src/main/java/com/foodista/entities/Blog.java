package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "BLOG")
public class Blog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blogId;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "blog_description")
    private String blogDescription;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    // Getters and Setters
}