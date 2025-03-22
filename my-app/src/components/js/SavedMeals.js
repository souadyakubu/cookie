import React from 'react';
import { Box, Heading, SimpleGrid, IconButton, Text, Center } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import RecipeCard from './RecipeCard';
import { useNavigate } from 'react-router-dom';

const SavedMeals = () => {
    const navigate = useNavigate();
    const savedMeals = JSON.parse(localStorage.getItem('savedMeals') || '[]');

    return (
        <Box p={4}>
            <IconButton
                icon={<ArrowBackIcon />}
                onClick={() => navigate(-1)}
                aria-label="Go back"
                mb={4}
            />

            <Heading as="h1" size="xl" mb={8} textAlign="center">
                Saved Meals
            </Heading>

            {savedMeals.length === 0 ? (
                <Center height="50vh">
                    <Text fontSize="xl" color="gray.500">
                        No saved meals yet!
                    </Text>
                </Center>
            ) : (
                <SimpleGrid columns={[1, 2, 3, 4]} spacing={4}>
                    {savedMeals.map((meal) => (
                        <RecipeCard
                            key={meal.idMeal}
                            recipe={meal}
                            onClick={() => navigate(`/recipe-viewing/${meal.idMeal}`)}
                            isSaved={true}
                        />
                    ))}
                </SimpleGrid>
            )}
        </Box>
    );
};

export default SavedMeals;
