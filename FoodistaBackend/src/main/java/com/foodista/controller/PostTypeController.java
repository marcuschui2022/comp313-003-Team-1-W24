package com.foodista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;

import com.foodista.entities.PostType;

import com.foodista.services.JwtService;
import com.foodista.repositories.PostTypeRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/post-type")
public class PostTypeController {

    @Autowired
    private final JwtService jwtService;
    private final PostTypeRepository postTypeRepository;

    @GetMapping("/")
    public ResponseEntity<List<PostType>> getAllPostType(@RequestHeader(value = "Authorization", required = false) String token) {
        System.out.println("get_all_post_type_1");
        try {

            List<PostType> postTpyes = new ArrayList<PostType>();
            System.out.println("get_all_post_type_2");

            postTypeRepository.findAllPostType().forEach(postTpyes::add);
            // System.out.println("get_all_3");

            if (postTpyes.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            // System.out.println("get_all_4");

            return new ResponseEntity<>(postTpyes, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
 
}
