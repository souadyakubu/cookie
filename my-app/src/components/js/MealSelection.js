import { Grid, Box, Image, Text, Spinner } from '@chakra-ui/react';

const MealSelection = ({ meals = [], loading, onSelect }) => (
    <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6} justifyContent="center">
        {loading ? (
            <Box display="flex" justifyContent="center" width="100%">
                <Spinner size="xl" />
            </Box>
        ) : meals.length > 0 ? (
            meals.map((meal) => (
                <Box
                    key={meal.idMeal}
                    p={4}
                    borderWidth={1}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ shadow: 'md' }}
                    onClick={() => onSelect(meal)}
                >
                    <Image
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        boxSize="200px"
                        objectFit="cover"
                        borderRadius="md"
                        mx="auto"
                    />
                    <Text mt={2} fontWeight="semibold" textAlign="center">
                        {meal.strMeal}
                    </Text>
                </Box>
            ))
        ) : (
            <Text gridColumn="span 3" textAlign="center">
                No meals available.
            </Text>
        )}
    </Grid>
);

export default MealSelection;
