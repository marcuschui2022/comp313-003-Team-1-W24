package com.foodista.services;

import com.foodista.dto.*;

import com.foodista.entities.User;
import com.foodista.entities.Role;
import com.foodista.repositories.UserRepository;
import com.foodista.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.core.AuthenticationException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<AuthenticationResponse> signUp(SignUpRequest request) {
        Optional<Role> optionalRole = roleRepository.findById(2L);

        if (optionalRole.isEmpty()) {
            throw new RuntimeException("Default role not found");
        }

        Role defaultRole = optionalRole.get();

        var user = User
                .builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .roleId(defaultRole.getId())
                .build();

        try {
            user = userService.save(user);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.badRequest().body(AuthenticationResponse.builder().status(HttpStatus.BAD_REQUEST.name()).message("Duplicate email address").build());
        }

        var jwt = jwtService.generateToken(user);

        return ResponseEntity.ok().body(AuthenticationResponse.builder().status(HttpStatus.OK.name()).token(jwt).fullName(user.getFullName()).userId(user.getUserId()).build());
    }


    public ResponseEntity<AuthenticationResponse> signIn(SignInRequest request) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(AuthenticationResponse.builder()
                    .status(HttpStatus.UNAUTHORIZED.name())
                    .message("Invalid email or password")
                    .build());

        }

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        var jwt = jwtService.generateToken(user);

        return ResponseEntity.ok().body(AuthenticationResponse.builder().status(HttpStatus.OK.name()).token(jwt).fullName(user.getFullName()).userId(user.getUserId()).build());
    }

}
