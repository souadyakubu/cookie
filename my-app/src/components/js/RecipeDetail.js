import { useRef } from 'react';
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
  useToast,
  Divider,
  Stack,
  Wrap,
  WrapItem,
  Flex,
  SimpleGrid,
} from '@chakra-ui/react';
import { ArrowBackIcon, StarIcon } from '@chakra-ui/icons';
import { MdPlayCircleOutline } from 'react-icons/md';

const VIDEO_HEIGHT = 315;

const RecipeDetail = ({
  recipe,
  onBack,
  onSave,
  onRemove,
  isSaved,
  lastListType,
}) => {
  const toast = useToast();
  const imageRef = useRef(null);

  // Gathering ingredients
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];
    if (ingredient && ingredient.trim() !== '') {
      ingredients.push({ ingredient, measure });
    }
  }

  // Spliting the ingredients into columns if there are many
  const columns = ingredients.length > 12 ? 2 : 1;
  const itemsPerColumn = Math.ceil(ingredients.length / columns);
  const ingredientColumns = Array.from({ length: columns }).map((_, colIdx) =>
    ingredients.slice(colIdx * itemsPerColumn, (colIdx + 1) * itemsPerColumn)
  );

  const youtubeUrl = recipe.strYoutube?.replace('watch?v=', 'embed/');

  const instructionSteps = recipe.strInstructions
    ? recipe.strInstructions
      .split(/\r?\n|\.\s(?=[A-Z])/)
      .map((step) => step.trim())
      .filter((step) => step.length > 0)
    : [];

  const backLabel =
    lastListType === 'featured'
      ? 'Back to Categories'
      : lastListType === 'category'
        ? 'Back to Categories'
        : lastListType === 'country'
          ? 'Back to Countries'
          : lastListType === 'search'
            ? 'Back to Search Results'
            : 'Back to Recipes';


  return (
    <Box maxW="6xl" mx="auto" py={10} px={{ base: 4, md: 8 }}>
      <Flex justify="flex-start" mb={8}>
        <Button
          leftIcon={<ArrowBackIcon />}
          onClick={onBack}
          colorScheme="teal"
          variant="outline"
          size="md"
          borderRadius="full"
          px={6}
          _hover={{ bg: 'teal.50' }}
        >
          {backLabel}
        </Button>
      </Flex>

      {/* Making Image & Info Side by Side */}
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={8}
        align="stretch"
        mb={10}
        maxW="100%"
      >
        <GridItem>
          <Box
            position="relative"
            borderRadius="xl"
            overflow="hidden"
            boxShadow="2xl"
            width="100%"
            maxW="none"
            flexShrink={0}
          >
            <Image
              ref={imageRef}
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              borderRadius="xl"
              width="100%"
              objectFit="cover"
              maxH="500px"
            />
            <IconButton
              icon={<StarIcon />}
              position="absolute"
              top={3}
              right={3}
              size="lg"
              colorScheme={isSaved ? 'yellow' : 'whiteAlpha'}
              variant="solid"
              aria-label={isSaved ? 'Remove from saved' : 'Save recipe'}
              onClick={() => {
                if (isSaved) {
                  onRemove(recipe.idMeal);
                  toast({ title: 'Removed from saved meals', status: 'info', duration: 2000 });
                } else {
                  onSave(recipe);
                  toast({ title: 'Recipe saved!', status: 'success', duration: 2000 });
                }
              }}
            />
          </Box>
        </GridItem>
        <GridItem>
          <Stack spacing={4}>
            <Box>
              <Heading size="2xl" mb={2} noOfLines={2}>
                {recipe.strMeal}
              </Heading>
              <Wrap mt={2}>
                <WrapItem>
                  <Tag size="lg" colorScheme="blue">{recipe.strCategory}</Tag>
                </WrapItem>
                {recipe.strTags?.split(',').map((tag) => (
                  <WrapItem key={tag.trim()}>
                    <Tag size="lg" colorScheme="green">{tag.trim()}</Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
            <Box>
              <Heading size="lg" mb={4}>Ingredients</Heading>
              <SimpleGrid columns={columns} spacing={3}>
                {ingredientColumns.map((column, colIdx) => (
                  <List key={colIdx} spacing={3}>
                    {column.map((item, idx) => (
                      <ListItem key={idx} display="flex" alignItems="center">
                        <ListIcon as={MdPlayCircleOutline} color="green.500" />
                        <Text as="span" fontWeight="semibold">
                          {item.measure}
                        </Text>
                        <Text as="span" ml={2}>
                          {item.ingredient}
                        </Text>
                      </ListItem>
                    ))}
                  </List>
                ))}
              </SimpleGrid>
            </Box>
          </Stack>
        </GridItem>
      </Grid>

      {/* Instructions & Video Tutorial Side by Side */}
      <Grid
        templateColumns={{ base: '1fr', md: '1fr 1fr' }}
        gap={10}
        alignItems="flex-start"
        maxW="100%"
      >

        <GridItem>
          <Box>
            <Heading size="lg" mb={4}>Instructions</Heading>
            <Box
              bg="gray.50"
              border="1px"
              borderColor="gray.200"
              borderRadius="md"
              p={5}
              boxShadow="md"
              height={`${VIDEO_HEIGHT}px`}
              maxH={`${VIDEO_HEIGHT}px`}
              overflowY="auto"
              transition="height 0.2s"
            >
              {instructionSteps.length > 1 ? (
                <List spacing={4}>
                  {instructionSteps.map((step, idx) => (
                    <ListItem key={idx}>
                      <Text fontSize="md" color="gray.700">{step}</Text>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Text fontSize="md" color="gray.700" whiteSpace="pre-line">
                  {recipe.strInstructions}
                </Text>
              )}
            </Box>
          </Box>

          {recipe.strSource && (
            <Box mt={8}>
              <Divider my={4} />
              <Heading size="md" mb={2}>Source</Heading>
              <Link
                href={recipe.strSource}
                isExternal
                color="blue.600"
                wordBreak="break-word"
              >
                {recipe.strSource}
              </Link>
            </Box>
          )}
        </GridItem>

        <GridItem>
          {youtubeUrl && (
            <Box>
              <Heading size="lg" mb={4}>Video Tutorial</Heading>
              <Box
                overflow="hidden"
                borderRadius="lg"
                boxShadow="lg"
                height={`${VIDEO_HEIGHT}px`}
                maxH={`${VIDEO_HEIGHT}px`}
              >
                <iframe
                  width="100%"
                  height={VIDEO_HEIGHT}
                  src={youtubeUrl}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </Box>
            </Box>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
};

export default RecipeDetail;
