// src/utils/openAI.js
import axios from 'axios';

const API_KEY = 'API_KEY'; // Replace with your actual OpenAI API key

// Function to fetch recipes
export const getRecipes = async () => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: 'Generate a list of recipes',
        max_tokens: 2048,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    throw error;
  }
};

// Function to fetch ingredient-based suggestions
export const getSuggestions = async (ingredients) => {
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/completions',
      {
        model: 'text-davinci-003',
        prompt: `Suggest recipes based on these ingredients: ${ingredients}`,
        max_tokens: 2048,
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    throw error;
  }
};

// Default export (optional, if needed elsewhere)
export default { getRecipes, getSuggestions };
