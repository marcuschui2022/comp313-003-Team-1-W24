package com.foodistaws.controller;

import com.foodistaws.entity.Content;
import com.foodistaws.service.ContentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    final
    ContentService contentService;

    public ContentController(ContentService contentService) {
        this.contentService = contentService;
    }

    @PostMapping("/")
    Content createContent(@RequestBody Content newContent){
        return contentService.create(newContent);
    }

    @GetMapping("/{id}")
    Content readOneContent(@PathVariable String id){
        return contentService.readOne(id);
    }

    @GetMapping("/")
    List<Content> readAllContent(){
        return contentService.readAll();
    }

    @PutMapping("/{id}")
    Content updateContent(@RequestBody Content newContent, @PathVariable String id){
        return contentService.update(newContent,id);
    }

    @DeleteMapping("/{id}")
    void deleteContent(@PathVariable String id){
        contentService.delete(id);
    }
}
