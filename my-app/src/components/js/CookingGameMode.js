import React, { useState } from 'react';
import axios from 'axios';
import { getSuggestions } from '../../utils/openAI'; // OpenAI integration for recipes

const SPOONACULAR_API_KEY = 'YOUR_SPOONACULAR_API_KEY'; // Replace with actual key

function CookingGameMode() {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipe, setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientImages, setIngredientImages] = useState({});
    const [utensils, setUtensils] = useState([ //use cooking utensils here
    ]);

    // Fetch ingredient images dynamically
    const fetchIngredientImages = async (ingredientsList) => {
        let images = {};
        for (const ingredient of ingredientsList) {
            try {
                const response = await axios.get(
                    'https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&apiKey=${SPOONACULAR_API_KEY}'
                );

                console.log('Spoonacular API response for ${ingredient}:', response.data);

                if (response.data.results.length > 0) {
                    const ingredientId = response.data.results[0].id;
                    const detailResponse = await axios.get(
                        'https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${SPOONACULAR_API_KEY}'
                    );

                    images[ingredient] = `https://spoonacular.com/cdn/ingredients_100x100/${detailResponse.data.image}`;
                } else {
                    images[ingredient] = '/images/placeholder.png';
                }
            } catch (error) {
                console.error('Error fetching image for ${ingredient}:', error);
                images[ingredient] = '/images/placeholder.png';
            }
        }
        setIngredientImages(images);
    };

    const handleSearch = async () => {
        try {
            const response = await getSuggestions(searchTerm);
            setRecipe(response);

            const ingredientRegex = /\*\*Ingredients:\*\* (.*)/g;
            const match = response.match(ingredientRegex);
            if (match) {
                const ingredientText = match[0].replace(/\*\*Ingredients:\*\*/, '');
                const ingredientList = ingredientText.split(',').map((item) => item.trim());
                setIngredients(ingredientList);

                await fetchIngredientImages(ingredientList);
            }
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    return (
        <div className="cooking-game-mode">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for a recipe"
            />
            <button onClick={handleSearch}>Cook Now</button>

            {recipe && (
                <div className="recipe-info">
                    <h2>Recipe: {searchTerm}</h2>

                    <div className="ingredients">
                        {ingredients.map((ingredient) => (
                            <div key={ingredient}>
                                <img
                                    src={ingredientImages[ingredient] || '/images/placeholder.png'}
                                    alt={ingredient}
                                    style={{ width: '100px', height: '100px' }}
                                    onError={(e) => (e.target.src = '/images/placeholder.png')} // Fallback if image fails
                                />
                                <p>{ingredient}</p>
                            </div>
                        ))}
                    </div>

                    <div className="utensils">
                        {utensils.map((utensil) => (
                            <div key={utensil.name}>
                                <img
                                    src={utensil.image}
                                    alt={utensil.name}
                                    style={{ width: '100px', height: '100px' }}
                                    onError={(e) => (e.target.src = '/images/placeholder.png')} // Fallback if image fails
                                />
                                <p>{utensil.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default CookingGameMode;