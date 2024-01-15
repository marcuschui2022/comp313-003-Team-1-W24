package com.foodistaws.controller;

import com.foodistaws.entity.Advertisement;
import com.foodistaws.service.AdvertisementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adverts")
public class AdvertisementController {

    final
    AdvertisementService advertService;

    public AdvertisementController(AdvertisementService advertService) {
        this.advertService = advertService;
    }

    @PostMapping("/")
    public Advertisement createAdvert(@RequestBody Advertisement newAdvert){
        return advertService.create(newAdvert);
    }
    @GetMapping("/{id}")
    Advertisement readOneAdvert(@PathVariable String id){
        return advertService.readOne(id);
    }

    @GetMapping("/")
    List<Advertisement> readAllAdverts(){
        return advertService.readAll();
    }

    @PutMapping("/{id}")
    Advertisement updateAdvert(@RequestBody Advertisement newAdvert, @PathVariable String id){
        return advertService.update(newAdvert,id);
    }

    @DeleteMapping("/{id}")
    void deleteAdvert(@PathVariable String id){
        advertService.delete(id);
    }
}
