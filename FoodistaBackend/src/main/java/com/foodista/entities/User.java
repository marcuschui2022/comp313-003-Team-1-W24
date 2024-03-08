package com.foodista.entities;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

//import com.foodista.models.Role;

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
    String username;

    @Column(unique = true)
    String email;

    @Column(name = "REGISTERED_USER_PASSWORD")
    String password;

    @Column(name = "ROLE_ID")
    Integer roleId;
    // 1 is admin, 2 is user

    //@Enumerated(EnumType.STRING)
    //Role role;

    @OneToOne(fetch = FetchType.EAGER) // Adjust fetch type as needed
    @JoinColumn(name = "ROLE_ID", insertable = false, updatable = false)
    private Role role;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.getRoleName()));
    }

    @Override
    public String getUsername() {
        // our "username" for security is the email field
        return email;
    }

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