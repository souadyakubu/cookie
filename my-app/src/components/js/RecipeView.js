// src/components/js/RecipeView.js
import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../utils/openAI';

function RecipeView() {
  const [recipes, setRecipes] = useState('');

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const result = await getRecipes();
        setRecipes(result);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <div>
      <h1>Recipe Viewing</h1>
      <pre>{recipes}</pre>
    </div>
  );
}

export default RecipeView;
