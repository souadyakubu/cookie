import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Box, Heading, Grid, Image, Text, Button, Spinner } from '@chakra-ui/react';
import axios from 'axios';
import MealSelection from './MealSelection';
import PreparationStep from './PreparationStep';
import IngredientsStep from './IngredientsStep';
import CookingStep from './CookingStep';

// Tool images (replace with actual image URLs)
const TOOL_IMAGES = {
  knife: 'https://img.icons8.com/ios/500/knife.png',
  cuttingBoard: 'https://img.icons8.com/ios/500/cutting-board.png',
  pan: 'https://img.icons8.com/ios/500/frying-pan.png'
};

const CookingSimulation = () => {
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [preparedItems, setPreparedItems] = useState([]);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        // Fetch meals for multiple letters to get more variety
        const letters = ['a', 'b', 'c', 'd', 'e']; // Add more letters as needed
        const promises = letters.map(letter =>
          axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        );
        const responses = await Promise.all(promises);

        // Combine all meal results and parse ingredients
        const allMeals = responses
          .flatMap(response => response.data.meals || [])
          .slice(0, 30) // Limit to 12 meals
          .map(meal => ({
            ...meal,
            ingredients: parseIngredients(meal)
          }));

        setMeals(allMeals);
      } catch (error) {
        console.error('Error fetching meals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const parseIngredients = (meal) => {
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .filter(i => meal[`strIngredient${i}`])
      .map(i => ({
        name: meal[`strIngredient${i}`],
        measure: meal[`strMeasure${i}`],
        image: `https://www.themealdb.com/images/ingredients/${meal[`strIngredient${i}`]}-Small.png`,
        prepared: false
      }));
  };

  const steps = [
    { title: 'Select Ingredients', type: 'selection' },
    { title: 'Prepare Ingredients', type: 'preparation' },
    { title: 'Cook Meal', type: 'cooking' },
    { title: 'Serve Dish', type: 'plating' }
  ];

  return (
    <DndProvider backend={HTML5Backend}>
      <Box p={8} bg="gray.50" minH="100vh">
        <Heading as="h1" size="xl" mb={8} textAlign="center">
          Interactive Cooking Simulator
        </Heading>

        {!selectedMeal ? (
          <MealSelection meals={meals} loading={loading} onSelect={setSelectedMeal} />
        ) : (
          <Box>
            <Button mb={4} onClick={() => setSelectedMeal(null)}>← Back to Menu</Button>

            <Box mb={8} textAlign="center">
              <Heading as="h2" size="lg" mb={2}>{selectedMeal.strMeal}</Heading>
              <Text fontSize="lg" color="gray.600">{steps[currentStep].title}</Text>
            </Box>

            {currentStep === 0 && (
              <IngredientsStep
                ingredients={selectedMeal.ingredients}
                onComplete={() => setCurrentStep(1)}
              />
            )}

            {currentStep === 1 && (
              <PreparationStep
                ingredients={selectedMeal.ingredients}
                tools={TOOL_IMAGES}
                onComplete={(prepared) => {
                  setPreparedItems(prepared);
                  setCurrentStep(2);
                }}
              />
            )}

            {currentStep === 2 && (
              <CookingStep
                preparedItems={preparedItems}
                onComplete={() => setCurrentStep(3)}
              />
            )}

            <Box mt={8} textAlign="center">
              <Button
                mr={2}
                onClick={() => setCurrentStep(p => Math.max(0, p - 1))}
                disabled={currentStep === 0}
              >
                Previous Step
              </Button>
              <Button
                colorScheme="blue"
                onClick={() => setCurrentStep(p => Math.min(steps.length - 1, p + 1))}
                disabled={currentStep === steps.length - 1}
              >
                Next Step
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </DndProvider>
  );
};
export default CookingSimulation;