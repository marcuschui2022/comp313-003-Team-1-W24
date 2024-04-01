package com.foodista.initializers;

import com.foodista.entities.Role;
import com.foodista.entities.PostType;
import com.foodista.entities.CategoryDetail;

import com.foodista.repositories.RoleRepository;
import com.foodista.repositories.PostTypeRepository;
import com.foodista.repositories.CategoryDetailRepository;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final PostTypeRepository postTypeRepository;
    private final CategoryDetailRepository categoryDetailRepository;

    public DatabaseInitializer(
            RoleRepository roleRepository,
            PostTypeRepository postTypeRepository,
            CategoryDetailRepository categoryDetailRepository
    ) {
        this.roleRepository = roleRepository;
        this.postTypeRepository = postTypeRepository;
        this.categoryDetailRepository = categoryDetailRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        if (roleRepository.count() == 0) {
            Role adminRole = new Role();
            adminRole.setId(1L);
            adminRole.setRoleName("Admin");
            adminRole.setDescription("Administrator role");
            roleRepository.save(adminRole);

            Role userRole = new Role();
            userRole.setId(2L);
            userRole.setRoleName("User");
            userRole.setDescription("User role");
            roleRepository.save(userRole);
        }

        if (postTypeRepository.count() == 0) {
            PostType normal = new PostType();
            normal.setPostTypeId(1L);
            normal.setPostTypeName("Normal");
            normal.setPostTypeDescription("normal");
            postTypeRepository.save(normal);

            PostType premium = new PostType();
            premium.setPostTypeId(2L);
            premium.setPostTypeName("Premium");
            premium.setPostTypeDescription("premium");
            postTypeRepository.save(premium);

            PostType archive = new PostType();
            archive.setPostTypeId(3L);
            archive.setPostTypeName("Archive");
            archive.setPostTypeDescription("archive");
            postTypeRepository.save(archive);
        }

        if (categoryDetailRepository.count() == 0) {
            CategoryDetail recipt = new CategoryDetail();
            recipt.setCategoryId((long) 1);
            recipt.setCategoryName("Recipt");
            recipt.setCategoryDescription("Food recipt");
            categoryDetailRepository.save(recipt);

            CategoryDetail food = new CategoryDetail();
            food.setCategoryId((long) 2);
            food.setCategoryName("Food");
            food.setCategoryDescription("Food share");
            categoryDetailRepository.save(food);

            CategoryDetail restaurant = new CategoryDetail();
            restaurant.setCategoryId((long) 3);
            restaurant.setCategoryName("Restaurant");
            restaurant.setCategoryDescription("Restaurant Share");
            categoryDetailRepository.save(restaurant);
        }
    }
}