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
@Table(name = "POST_TYPE")
public class PostType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "post_type_id")
    private Long postTypeId;

    @Column(name = "post_type_name", nullable = false)
    private String postTypeName;

    @Column(name = "post_type_description")
    private String postTypeDescription;
}