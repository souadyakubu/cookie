import { Box, Text, Grid, Image } from '@chakra-ui/react';

const IngredientsStep = ({ ingredients, onComplete }) => {
    return (
        <Box p={4} borderRadius="md">
            <Text fontSize="xl" mb={4} fontWeight="bold">Gather Ingredients</Text>
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                {ingredients.map((ingredient, index) => (
                    <Box key={index} p={2} borderWidth={1} borderRadius="md">
                        <Image
                            src={ingredient.image}
                            alt={ingredient.name}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="md"
                        />
                        <Text mt={2} textAlign="center">{ingredient.name}</Text>
                        <Text fontSize="sm" color="gray.500">{ingredient.measure}</Text>
                    </Box>
                ))}
            </Grid>
            <button onClick={onComplete} style={{ marginTop: '20px' }}>
                Continue to Preparation
            </button>
        </Box>
    );
};

export default IngredientsStep;
