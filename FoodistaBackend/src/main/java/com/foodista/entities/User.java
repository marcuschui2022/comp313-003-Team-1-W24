package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@ToString
@Table(name = "REGISTERED_USER")
public class User implements UserDetails {

    @Id
    @Column(name = "USER_ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    // @Column(name = "FULL_NAME")
    String fullName;

    // @Column(name = "USER_NAME")
    @Column(unique = true)
    String username;

    @Column(unique = true)
    String email;

    @Column(name = "REGISTERED_USER_PASSWORD")
    String password;

    @Column(name = "ROLE_ID")
    Integer role;
    // 1 is admin, 2 is user


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // return List.of(new SimpleGrantedAuthority(role.name()));
        return List.of(new SimpleGrantedAuthority("ROLE_" + role));
    }

//   @Override
//   public String getUsername() {
//       // our "username" for security is the email field
//       return email;
//   }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}