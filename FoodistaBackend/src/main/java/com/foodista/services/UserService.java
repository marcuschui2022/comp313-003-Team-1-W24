package com.foodista.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.foodista.entities.Role;
import com.foodista.entities.User;
import com.foodista.repositories.UserRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                Optional<User> optionalUser = userRepository.findByEmail(username);

                // User validation
                if (optionalUser.isEmpty()) {
                    throw new UsernameNotFoundException("Could not find user");
                }

                User user = optionalUser.get();
                Role role = user.getRole();

                if (role == null) {
                    throw new UsernameNotFoundException("No role assigned to user");
                }

                // Roles are added with 'ROLE_' prefix
                List<SimpleGrantedAuthority> authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.getRoleName()));

                return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
            }
        };
    }

    public User save(User newUser) {
//        if (newUser.getId() == null) {
//            newUser.setCreatedAt(LocalDateTime.now());
//        }
//
//        newUser.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(newUser);
    }


}