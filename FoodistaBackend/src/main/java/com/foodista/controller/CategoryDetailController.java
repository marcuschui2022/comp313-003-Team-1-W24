package com.foodista.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.access.prepost.PreAuthorize;

import lombok.RequiredArgsConstructor;

import com.foodista.entities.CategoryDetail;

import com.foodista.services.JwtService;
import com.foodista.repositories.CategoryDetailRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@CrossOrigin(origins = "*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/category")
public class CategoryDetailController {

    @Autowired
    private final JwtService jwtService;
    private final CategoryDetailRepository categoryDetailRepository;

    @GetMapping("/")
    public ResponseEntity<List<CategoryDetail>> getAllPostType(@RequestHeader(value = "Authorization", required = false) String token) {
        System.out.println("get_all_Category_1");
        try {

            List<CategoryDetail> categoryList = new ArrayList<CategoryDetail>();
            System.out.println("get_all_Category_1");

            categoryDetailRepository.findAllCategory().forEach(categoryList::add);
            // System.out.println("get_all_Category_3");

            if (categoryList.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            // System.out.println("get_all_Category_4");

            return new ResponseEntity<>(categoryList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
 
}
