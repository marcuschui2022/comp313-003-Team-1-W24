package com.foodista.initializers;

import com.foodista.entities.Role;
import com.foodista.repositories.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DatabaseInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;

    public DatabaseInitializer(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
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
    }
}