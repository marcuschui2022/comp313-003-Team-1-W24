import React, { useState } from 'react';
import './RecipeFinder.css'; // Import CSS file for styling

function RecipeFinder() {
  const [recipeName, setRecipeName] = useState('');
  const [recipeData, setRecipeData] = useState(null);

  const fetchRecipe = async () => {
    try {
      const response = await fetch('http://localhost:8081/recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ recipeName: recipeName }),
      });
      const data = await response.json();
      setRecipeData(data);
    } catch (error) {
      console.error('Error fetching recipe:', error);
    }
  };

  return (
    <div className="recipe-finder-container">
      <h2 className="title">AI Recipe Finder</h2> {/* Added header indicating AI powered recipe finder */}
      <p className="description">Welcome to the AI Recipe Finder! Enter the name of a recipe you're interested in below and let the AI find it for you.</p> {/* Added description */}
      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Enter recipe name"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
        />
        <button className="search-button" onClick={fetchRecipe}>Search</button>
      </div>
      {recipeData && (
        <div className="recipe-details">
          <h3 className="recipe-name">{recipeData.name}</h3>
          {recipeData.ingredients && (
            <div className="ingredient-container">
              <h4 className="section-title">Ingredients:</h4>
              <ul className="ingredient-list">
                {recipeData.ingredients.map((ingredient, index) => (
                  <li key={index} className="ingredient">{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
          {recipeData.instructions && (
            <div className="instruction-container">
              <h4 className="section-title">Instructions:</h4>
              <ol className="instruction-list">
                {recipeData.instructions.map((instruction, index) => (
                  <li key={index} className="instruction">{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RecipeFinder;
