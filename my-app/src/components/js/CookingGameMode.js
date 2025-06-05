import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getSuggestions } from '../../utils/openAI';

const SPOONACULAR_API_KEY = 'SPOONACULAR_API_KEY';

function CookingGameMode() {
    const [searchTerm, setSearchTerm] = useState('');
    const [setRecipe] = useState(null);
    const [ingredients, setIngredients] = useState([]);
    const [ingredientImages, setIngredientImages] = useState({});
    const [utensils] = useState([
        { name: 'Knife', image: '/images/knife.png' },
        { name: 'Pan', image: '/images/pan.png' },
        { name: 'Spatula', image: '/images/spatula.png' }
    ]);
    const [gameState, setGameState] = useState('idle');
    const [score, setScore] = useState(0);
    const [timer, setTimer] = useState(300);

    useEffect(() => {
        let interval;
        if (gameState === 'cooking' && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setGameState('gameOver');
        }
        return () => clearInterval(interval);
    }, [gameState, timer]);

    const fetchIngredientImages = async (ingredientsList) => {
        let images = {};
        for (const ingredient of ingredientsList) {
            try {
                const response = await axios.get(
                    `https://api.spoonacular.com/food/ingredients/search?query=${ingredient}&apiKey=${SPOONACULAR_API_KEY}`
                );
                if (response.data.results.length > 0) {
                    const ingredientId = response.data.results[0].id;
                    const detailResponse = await axios.get(
                        `https://api.spoonacular.com/food/ingredients/${ingredientId}/information?apiKey=${SPOONACULAR_API_KEY}`
                    );
                    images[ingredient] = `https://spoonacular.com/cdn/ingredients_100x100/${detailResponse.data.image}`;
                } else {
                    images[ingredient] = '/images/placeholder.png';
                }
            } catch (error) {
                console.error(`Error fetching image for ${ingredient}:`, error);
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
            setGameState('cooking');
            setTimer(300);
        } catch (error) {
            console.error("Error fetching recipe:", error);
        }
    };

    const handleIngredientClick = (ingredient) => {
        setScore((prevScore) => prevScore + 10);
        setIngredients((prevIngredients) => prevIngredients.filter((item) => item !== ingredient));
    };

    const handleUtensilClick = (utensil) => {
        setScore((prevScore) => prevScore + 5);
    };

    const renderGameContent = () => {
        switch (gameState) {
            case 'idle':
                return (
                    <div>
                        <h2>Welcome to the Cooking Game!</h2>
                        <p>Enter a dish you'd like to cook:</p>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for a recipe"
                        />
                        <button onClick={handleSearch}>Start Cooking</button>
                    </div>
                );
            case 'cooking':
                return (
                    <div className="cooking-area">
                        <h2>Now Cooking: {searchTerm}</h2>
                        <p>Time Remaining: {Math.floor(timer / 60)}:{timer % 60 < 10 ? '0' : ''}{timer % 60}</p>
                        <p>Score: {score}</p>
                        <div className="ingredients">
                            {ingredients.map((ingredient) => (
                                <div key={ingredient} onClick={() => handleIngredientClick(ingredient)}>
                                    <img
                                        src={ingredientImages[ingredient] || '/images/placeholder.png'}
                                        alt={ingredient}
                                        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                                    />
                                    <p>{ingredient}</p>
                                </div>
                            ))}
                        </div>
                        <div className="utensils">
                            {utensils.map((utensil) => (
                                <div key={utensil.name} onClick={() => handleUtensilClick(utensil)}>
                                    <img
                                        src={utensil.image}
                                        alt={utensil.name}
                                        style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                                    />
                                    <p>{utensil.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'gameOver':
                return (
                    <div>
                        <h2>Game Over!</h2>
                        <p>Your final score: {score}</p>
                        <button onClick={() => {
                            setGameState('idle');
                            setScore(0);
                            setSearchTerm('');
                            setRecipe(null);
                            setIngredients([]);
                        }}>Play Again</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="cooking-game-mode">
            {renderGameContent()}
        </div>
    );
}

export default CookingGameMode;
