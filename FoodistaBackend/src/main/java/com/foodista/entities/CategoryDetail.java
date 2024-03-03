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
@Table(name = "CATEGORY_DETAIL")
public class CategoryDetail {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(name = "category_name", nullable = false)
    private String categoryName;

    @Column(name = "category_description")
    private String categoryDescription;

    // Relationship with Post might not be necessary depending on the use case

    // Getters and Setters
}