package com.foodista;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import com.foodista.entity.TestUser;
import com.foodista.repository.TestUserRepo;

@SpringBootApplication
public class FoodistaBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(FoodistaBackendApplication.class, args);

		//ConfigurableApplicationContext ctxt = SpringApplication.run(FoodistaBackendApplication.class, args);
		
		//TestUserRepo bean = ctxt.getBean(TestUserRepo.class);

		//TestUser testUser = new TestUser();
		//testUser.setId(4);
		//testUser.setUsername("Test user 4");
		//testUser.setEmail("a@a.com");

		//bean.save(testUser);

		//for(TestUser t : bean.findAll()) {
		//	System.out.println(t.getId() + " " + t.getUsername() + " " + t.getUsername());
		//}
		
		//ctxt.close();

	}

}
