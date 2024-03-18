package com.foodista.initializers;

import com.foodista.entities.Role;
import com.foodista.repositories.RoleRepository;
import com.foodista.entities.PostType;
import com.foodista.repositories.PostTypeRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PostTypeRepository postTypeRepository;

    public DatabaseInitializer(RoleRepository roleRepository, PostTypeRepository postTypeRepository) {
        this.roleRepository = roleRepository;
        this.postTypeRepository = postTypeRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setId(1);
            adminRole.setRoleName("Admin");
            adminRole.setDescription("Administrator role");
            roleRepository.save(adminRole);

            Role userRole = new Role();
            userRole.setId(2);
            userRole.setRoleName("User");
            userRole.setDescription("User role");
            roleRepository.save(userRole);
        }

        if(postTypeRepository.count() == 0) {
            PostType recipt = new PostType();
            recipt.setPostTypeId(1);
            recipt.setPostTypeName("Recipt");
            recipt.setPostTypeDescription("Food recipt");
            postTypeRepository.save(recipt);

            PostType food = new PostType();
            food.setPostTypeId(2);
            food.setPostTypeName("Food");
            food.setPostTypeDescription("Food share");
            postTypeRepository.save(food);

            PostType restaurant = new PostType();
            restaurant.setPostTypeId(3);
            restaurant.setPostTypeName("Restaurant");
            restaurant.setPostTypeDescription("Restaurant Share");
            postTypeRepository.save(restaurant);
        }
    }
}