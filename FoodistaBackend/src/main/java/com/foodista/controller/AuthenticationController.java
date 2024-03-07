package com.foodista.controller;

import com.foodista.dto.JwtAuthenticationResponse;
import com.foodista.dto.SignInRequest;
import com.foodista.dto.SignUpRequest;
import com.foodista.dto.SignInResponse;

import com.foodista.services.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/signup")
    public ResponseEntity signup(@RequestBody SignUpRequest request) {
        return authenticationService.signup(request);
    }

    @PostMapping("/signin")
    public SignInResponse signin(@RequestBody SignInRequest request) {
        return authenticationService.signin(request);
    }
}