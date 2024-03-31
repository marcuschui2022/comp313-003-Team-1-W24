package com.kp.Entity;

public class Recipe {
   
	
	public Recipe() {
		super();
		// TODO Auto-generated constructor stub
	}
	public Recipe(String name, String[] ingredients, String[] instructions) {
		super();
		this.name = name;
		this.ingredients = ingredients;
		this.instructions = instructions;
	}
	
	
	private String name;
	private String[] ingredients;
    private String[] instructions; 
    
    
    public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String[] getIngredients() {
		return ingredients;
	}
	public void setIngredients(String[] ingredients) {
		this.ingredients = ingredients;
	}
	public String[] getInstructions() {
		return instructions;
	}
	public void setInstructions(String[] instructions) {
		this.instructions = instructions;
	}
	
    // You can add instructions as well
    
    // Constructor, getters, and setters
}