package com.foodistaws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories("com.foodistaws.repository")
public class FoodistaWsApplication {
    public static void main(String[] args) {
        SpringApplication.run(FoodistaWsApplication.class, args);
    }
}
