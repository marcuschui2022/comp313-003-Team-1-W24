package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.foodista.entities.User;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "BLOG")
public class Blog {

    @Id
    @Column(name = "BLOG_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long blogId;

    @Column(name = "TITLE", nullable = false)
    private String title;

    @Column(name = "BLOG_DESCRIPTION")
    private String blogDescription;

    @ManyToOne
    @JoinColumn(name = "USER_ID", nullable = false)
    private User user;

    // Getters and Setters
}