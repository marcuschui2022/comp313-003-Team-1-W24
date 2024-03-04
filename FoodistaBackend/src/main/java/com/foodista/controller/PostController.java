package com.foodista.controller;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.prepost.PreAuthorize;

import com.foodista.dto.JwtAuthenticationResponse;
import com.foodista.services.AuthenticationService;
import lombok.RequiredArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/post")
public class PostController {

    @GetMapping("/")
    public String anonEndPoint() {
        return "everyone can see this";
    }

}
