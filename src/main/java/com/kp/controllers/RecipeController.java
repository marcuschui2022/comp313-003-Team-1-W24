// RecipeController.java

package com.kp.controllers;

import com.kp.Entity.Recipe;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RecipeController {

    @PostMapping("/recipe")
    public ResponseEntity<Recipe> getRecipe(@RequestBody RecipeRequest request) {
        String recipeName = request.getRecipeName();
        String[] ingredients;
        String[] instructions;

        switch (recipeName.toLowerCase()) {
        case "pizza":
            ingredients = new String[]{"Dough", "Tomato Sauce", "Cheese", "Toppings"};
            instructions = new String[]{"Preheat oven to 475°F (245°C).", "Spread dough onto a pizza pan...", "Bake in preheated oven until the crust is golden brown and the cheese is melted...", "Enjoy!"};
            return ResponseEntity.ok(new Recipe("Pizza", ingredients, instructions));
        case "pasta":
            ingredients = new String[]{"Pasta", "Tomato Sauce", "Garlic", "Olive Oil"};
            instructions = new String[]{"Boil water in a pot.", "Cook pasta until al dente...", "Heat olive oil in a pan, sauté garlic...", "Combine pasta, sauce, and garlic...", "Serve hot!"};
            return ResponseEntity.ok(new Recipe("Pasta", ingredients, instructions));
        case "burger":
            ingredients = new String[]{"Ground beef", "Burger buns", "Lettuce", "Tomato", "Onion", "Pickles", "Cheese", "Ketchup", "Mustard"};
            instructions = new String[]{"Season ground beef with salt and pepper.", "Form into patties...", "Cook patties on a grill or stovetop until desired doneness...", "Assemble burger with desired toppings...", "Serve hot!"};
            return ResponseEntity.ok(new Recipe("Burger", ingredients, instructions));
        case "pancakes":
            ingredients = new String[]{"Flour", "Milk", "Egg", "Butter", "Sugar", "Baking powder"};
            instructions = new String[]{"In a bowl, mix flour, sugar, and baking powder...", "In another bowl, whisk together milk, egg, and melted butter...", "Combine wet and dry ingredients...", "Cook pancakes on a greased skillet until golden brown on both sides...", "Serve hot with syrup and toppings of your choice!"};
            return ResponseEntity.ok(new Recipe("Pancakes", ingredients, instructions));
        case "lasagna":
            ingredients = new String[]{"Lasagna noodles", "Ground beef", "Tomato sauce", "Ricotta cheese", "Mozzarella cheese", "Parmesan cheese", "Onion", "Garlic"};
            instructions = new String[]{"Preheat oven to 375°F (190°C).", "Brown ground beef with onion and garlic...", "Layer lasagna noodles, meat sauce, ricotta, and mozzarella cheese...", "Repeat layers...", "Bake for about 45 minutes until bubbly and golden brown on top..."};
            return ResponseEntity.ok(new Recipe("Lasagna", ingredients, instructions));
        case "chocolate cake":
            ingredients = new String[]{"Flour", "Sugar", "Cocoa powder", "Baking powder", "Baking soda", "Salt", "Eggs", "Milk", "Vegetable oil", "Vanilla extract", "Hot water"};
            instructions = new String[]{"Preheat oven to 350°F (175°C).", "Mix dry ingredients in a bowl...", "Add eggs, milk, oil, and vanilla...", "Beat on medium speed until smooth...", "Stir in hot water...", "Pour into greased and floured pans...", "Bake for 30 to 35 minutes or until a toothpick inserted comes out clean..."};
            return ResponseEntity.ok(new Recipe("Chocolate Cake", ingredients, instructions));
        case "chicken stir fry":
            ingredients = new String[]{"Chicken breast", "Vegetables (such as bell peppers, broccoli, carrots)", "Soy sauce", "Oyster sauce", "Garlic", "Ginger", "Cornstarch", "Oil"};
            instructions = new String[]{"Slice chicken into thin strips...", "Marinate chicken with soy sauce, garlic, and ginger...", "Heat oil in a pan...", "Stir-fry chicken until browned...", "Add vegetables and cook until tender...", "Mix cornstarch with water to make a slurry...", "Add slurry to thicken the sauce...", "Serve hot with rice!"};
            return ResponseEntity.ok(new Recipe("Chicken Stir Fry", ingredients, instructions));
        case "sushi rolls":
            ingredients = new String[]{"Sushi rice", "Nori sheets", "Sushi-grade fish (such as tuna, salmon)", "Vegetables (such as cucumber, avocado)", "Soy sauce", "Wasabi", "Pickled ginger"};
            instructions = new String[]{"Prepare sushi rice according to package instructions...", "Place nori sheet on a bamboo mat...", "Spread rice evenly on the nori sheet...", "Add fillings like fish and vegetables...", "Roll tightly using the bamboo mat...", "Slice into pieces...", "Serve with soy sauce, wasabi, and pickled ginger..."};
            return ResponseEntity.ok(new Recipe("Sushi Rolls", ingredients, instructions));
        case "chicken curry":
            ingredients = new String[]{"Chicken thighs", "Onion", "Garlic", "Ginger", "Tomatoes", "Coconut milk", "Curry powder", "Turmeric", "Cumin", "Coriander", "Chili powder", "Salt"};
            instructions = new String[]{"Heat oil in a pot...", "Sauté onion, garlic, and ginger until fragrant...", "Add chicken and brown on all sides...", "Stir in spices and cook for a few minutes...", "Add tomatoes and coconut milk...", "Simmer until chicken is cooked through...", "Serve hot with rice or naan!"};
            return ResponseEntity.ok(new Recipe("Chicken Curry", ingredients, instructions));
        case "spaghetti carbonara":
            ingredients = new String[]{"Spaghetti", "Bacon", "Eggs", "Parmesan cheese", "Black pepper", "Garlic"};
            instructions = new String[]{"Cook spaghetti in salted water until al dente...", "Fry bacon until crispy...", "In a bowl, whisk together eggs, Parmesan cheese, and black pepper...", "Drain spaghetti and reserve some cooking water...", "Toss hot spaghetti with bacon and garlic...", "Add egg mixture and toss until creamy...", "Thin out with reserved cooking water if needed...", "Serve hot with extra Parmesan cheese and black pepper!"};
            return ResponseEntity.ok(new Recipe("Spaghetti Carbonara", ingredients, instructions));
        case "chocolate chip cookies":
            ingredients = new String[]{"Flour", "Butter", "Sugar", "Brown sugar", "Eggs", "Vanilla extract", "Baking soda", "Salt", "Chocolate chips"};
            instructions = new String[]{"Preheat oven to 375°F (190°C).", "Cream together butter, sugar, and brown sugar...", "Beat in eggs and vanilla...", "Combine flour, baking soda, and salt...", "Stir into butter mixture until well blended...", "Fold in chocolate chips...", "Drop by spoonfuls onto ungreased baking sheets...", "Bake for 8 to 10 minutes until edges are golden brown...", "Cool on wire racks..."};
            return ResponseEntity.ok(new Recipe("Chocolate Chip Cookies", ingredients, instructions));





            // Add more cases for other recipes as needed
            default:
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new Recipe("Recipe not found", new String[]{}, new String[]{}));
        }
    }

    static class RecipeRequest {
        private String recipeName;

        // Getter and setter for recipeName
        public String getRecipeName() {
            return recipeName;
        }

        public void setRecipeName(String recipeName) {
            this.recipeName = recipeName;
        }
    }
}