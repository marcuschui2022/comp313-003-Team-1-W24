package com.foodista.services;

import com.foodista.dto.ErrorResponse;
import com.foodista.dto.JwtAuthenticationResponse;
import com.foodista.dto.SignInRequest;
import com.foodista.dto.SignUpRequest;
import com.foodista.dto.SignInResponse;

import com.foodista.entities.User;
import com.foodista.models.Role;
import com.foodista.repositories.UserRepository;

import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final UserService userService;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity signup(SignUpRequest request) {
        var user = User
                .builder()
                .fullName(request.getFullName())
                .username(request.getUsername())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.ROLE_USER)
                .build();

//        user = userService.save(user);
        try {
            user = userService.save(user);
        } catch (DataIntegrityViolationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("duplicate email address"));

        }


        var jwt = jwtService.generateToken(user);

        Map<String, Object> responseMap = new HashMap<>();
        responseMap.put("token", jwt);
        responseMap.put("fullName", user.getFullName());
//        return JwtAuthenticationResponse.builder().token(jwt).build();
//        return ResponseEntity.status(HttpStatus.OK).body(new JwtAuthenticationResponse(jwt));
        return ResponseEntity.status(HttpStatus.OK).body(responseMap);
    }


    public SignInResponse signin(SignInRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

        var user = userRepository.findByEmail(request.getEmail()).orElseThrow(() -> new IllegalArgumentException("Invalid username or password."));
        var jwt = jwtService.generateToken(user);

        return SignInResponse.builder().token(jwt).fullName(user.getFullName()).build();
    }

}
