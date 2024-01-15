package com.foodistaws.service;

import com.foodistaws.entity.Advertisement;
import com.foodistaws.exception.AdvertisementNotFoundException;
import com.foodistaws.repository.AdvertisementRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdvertisementService {
    private final AdvertisementRepository repository;

    public AdvertisementService(AdvertisementRepository repository) {
        this.repository = repository;
    }

    public Advertisement create(Advertisement newAdvert){
        return repository.save(newAdvert);
    }

    public Advertisement readOne(String id){
        return repository.findById(id)
                .orElseThrow(() -> new AdvertisementNotFoundException(id));
    }

    public List<Advertisement> readAll(){
        return repository.findAll();
    }

    public Advertisement update(Advertisement newAdvert, String id){
        return repository.findById(id)
                .map(advert -> {
                    advert.setUser (newAdvert.getUser());
                    advert.setTitle (newAdvert.getTitle());
                    advert.setDescription(newAdvert.getDescription());
                    return repository.save(advert);
                }).orElseGet(() -> {
                    newAdvert.setAdvertID(id);
                    return repository.save(newAdvert);
                });
    }

    public void delete(String id){
        repository.deleteById(id);
    }
}
