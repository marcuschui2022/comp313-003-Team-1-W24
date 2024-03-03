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
@Table(name = "TAG_DETAIL")
public class TagDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    @Column(name = "tag_text", nullable = false)
    private String tagText;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    // Getters and Setters
}