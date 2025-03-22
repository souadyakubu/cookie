// src/components/js/IngredientSuggestions.js
import React, { useState } from 'react';
import { getSuggestions } from '../../utils/openAI';

function IngredientSuggestions() {
  const [ingredients, setIngredients] = useState('');
  const [suggestions, setSuggestions] = useState('');

  const handleSuggest = async () => {
    try {
      const result = await getSuggestions(ingredients);
      setSuggestions(result);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  return (
    <div>
      <h1>Ingredient Suggestions</h1>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients"
      />
      <button onClick={handleSuggest}>Get Suggestions</button>
      <pre>{suggestions}</pre>
    </div>
  );
}

export default IngredientSuggestions;
