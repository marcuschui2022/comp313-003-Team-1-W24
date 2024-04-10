package com.foodista;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.ModelAttribute;

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


    /**
     * The BaseController class is an abstract class that provides a common base for all controllers in the application.
     * <p>
     * It contains a method to extract and return the JWT token from the request headers.
     */
    public abstract static class BaseController {
        @ModelAttribute("jwtToken")
        public String getJwtToken(HttpServletRequest request) {
            String header = request.getHeader("Authorization");
            return header != null ? header.substring(7) : null;
        }
    }

}
