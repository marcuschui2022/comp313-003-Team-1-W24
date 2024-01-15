package com.foodistaws.service;

import com.foodistaws.entity.Content;
import com.foodistaws.exception.ContentNotFoundException;
import com.foodistaws.repository.ContentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContentService {
    private final ContentRepository repository;

    public ContentService(ContentRepository repository) {
        this.repository = repository;
    }

    public Content create(Content newContent){
        return repository.save(newContent);
    }

    public Content readOne(String id){
        return repository.findById(id)
                .orElseThrow(() -> new ContentNotFoundException(id));
    }

    public List<Content> readAll(){
        return repository.findAll();
    }

    public Content update(Content newContent, String id){
        return repository.findById(id)
                .map(content -> {
                    content.setContentType(newContent.getContentType());
                    content.setFileName(newContent.getFileName());
                    return repository.save(content);
                }).orElseGet(() -> {
                    newContent.setContentID(id);
                    return repository.save(newContent);
                });
    }

    public void delete(String id){
        repository.deleteById(id);
    }
}
