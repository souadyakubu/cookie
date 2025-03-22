import React from 'react';
import {
  Box,
  Heading,
  Image,
  Text,
  Button,
  List,
  ListItem,
  ListIcon,
  IconButton,
  Grid,
  GridItem,
  Link,
  Tag,
  useToast
} from '@chakra-ui/react';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { MdPlayCircleOutline } from 'react-icons/md';

const RecipeDetail = ({ recipe, onBack, onSave, onRemove, isSaved }) => {
  const toast = useToast();

  // Extract ingredients and measurements
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  // Convert YouTube URL to embed URL
  const youtubeUrl = recipe.strYoutube?.replace('watch?v=', 'embed/');

  return (
    <Box maxWidth="1200px" margin="0 auto" p={4}>
      <Button
        leftIcon={<ArrowBackIcon />}
        onClick={onBack}
        mb={4}
        colorScheme="gray"
        variant="ghost"
      >
        Back to Recipes
      </Button>

      <Grid templateColumns={{ base: '1fr', md: '1fr 1fr' }} gap={8}>
        {/* Left Column */}
        <GridItem>
          <Box position="relative">
            <Image
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              borderRadius="lg"
              boxShadow="xl"
            />
            <IconButton
              icon={<StarIcon />}
              position="absolute"
              top={2}
              right={2}
              size="lg"
              colorScheme={isSaved ? 'yellow' : 'gray'}
              aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
              onClick={() => {
                if (isSaved) {
                  onRemove(recipe.idMeal);
                  toast({
                    title: 'Removed from saved meals',
                    status: 'info',
                    duration: 2000,
                  });
                } else {
                  onSave(recipe);
                  toast({
                    title: 'Recipe saved!',
                    status: 'success',
                    duration: 2000,
                  });
                }
              }}
            />
          </Box>

          {youtubeUrl && (
            <Box mt={6}>
              <Heading size="md" mb={4}>
                Video Tutorial
              </Heading>
              <iframe
                width="100%"
                height="315"
                src={youtubeUrl}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ borderRadius: '8px' }}
              />
            </Box>
          )}
        </GridItem>

        {/* Right Column */}
        <GridItem>
          <Heading as="h1" size="xl" mb={4}>
            {recipe.strMeal}
          </Heading>

          <Box mb={6}>
            <Tag colorScheme="blue" mr={2}>
              {recipe.strCategory}
            </Tag>
            {recipe.strTags?.split(',').map(tag => (
              <Tag key={tag} colorScheme="green" mr={2} mt={2}>
                {tag.trim()}
              </Tag>
            ))}
          </Box>

          <Box mb={8}>
            <Heading size="md" mb={4}>
              Ingredients
            </Heading>
            <List spacing={2}>
              {ingredients.map((item, index) => (
                <ListItem key={index} display="flex" alignItems="center">
                  <ListIcon as={MdPlayCircleOutline} color="green.500" />
                  <Text as="span" fontWeight="medium">
                    {item.measure}
                  </Text>
                  <Text as="span" ml={1}>
                    {item.ingredient}
                  </Text>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box mb={8}>
            <Heading size="md" mb={4}>
              Instructions
            </Heading>
            <Text whiteSpace="pre-line">{recipe.strInstructions}</Text>
          </Box>

          {recipe.strSource && (
            <Box>
              <Heading size="md" mb={4}>
                Source
              </Heading>
              <Link
                href={recipe.strSource}
                isExternal
                color="blue.500"
                wordBreak="break-all"
              >
                {recipe.strSource}
              </Link>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RecipeDetail;
