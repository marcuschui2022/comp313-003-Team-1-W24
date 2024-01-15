package com.foodistaws.service;

import com.foodistaws.entity.LoginUser;
import com.foodistaws.entity.RegisteredUser;
import com.foodistaws.exception.RegisteredUserNotFoundException;
import com.foodistaws.exception.UserLoginException;
import com.foodistaws.repository.RegisteredUserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RegisteredUserService {
    private final RegisteredUserRepository repository;

    public RegisteredUserService(RegisteredUserRepository repository) {
        this.repository = repository;
    }

    public RegisteredUser create(RegisteredUser newRegisteredUser){
        return repository.save(newRegisteredUser);
    }

    public RegisteredUser readOne(String id){
        return repository.findById(id)
                .orElseThrow(() -> new RegisteredUserNotFoundException(id));
    }

    public List<RegisteredUser> readAll(){
        return repository.findAll();
    }

    public RegisteredUser update(RegisteredUser newRegisteredUser, String id){
        return repository.findById(id)
                .map(user -> {
                    user.setFullName(newRegisteredUser.getFullName());
                    user.setRole(newRegisteredUser.getRole());
                    return repository.save(user);
                }).orElseGet(() -> {
                    newRegisteredUser.setUserID(id);
                    return repository.save(newRegisteredUser);
                });
    }

    public void delete(String id){
        repository.deleteById(id);
    }

    public RegisteredUser login(LoginUser loginUser){
        return repository.findRegisteredUserByUserNameAndPasswd(loginUser.getUsername(), loginUser.getPassword())
                .orElseThrow(UserLoginException::new);
    }
}
