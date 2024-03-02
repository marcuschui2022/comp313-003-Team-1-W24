package com.foodista.services;

import java.time.LocalDateTime;

import com.foodista.entities.User;
import com.foodista.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;
import org.springframework.web.server.ResponseStatusException;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) {
                return userRepository.findByEmail(username)
                        .orElseThrow(() -> new UsernameNotFoundException("User not found"));
            }
        };
    }

    public User save(User newUser) {

        newUser.setRole(2);
//        try {
        return userRepository.save(newUser);
//        } catch (DataIntegrityViolationException e) {
//            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duplicate key", e);
//            return new User();
//        }
    }

}