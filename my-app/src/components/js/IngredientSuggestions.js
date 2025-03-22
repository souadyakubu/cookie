import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { getSuggestions } from '../../utils/openAI';
import { Box, Flex, Heading, Input, Button, VStack, Tag, TagLabel, TagCloseButton, IconButton, Text, Grid, Container, Divider } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const categories = {
  Vegetables: ['Tomato', 'Carrot', 'Broccoli', 'Spinach', 'Garlic', 'Onion'],
  Proteins: ['Chicken', 'Beef', 'Tofu', 'Eggs', 'Salmon', 'Shrimp'],
  Grains: ['Rice', 'Pasta', 'Wheet', 'Oats', 'Barley'],
  Dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream']
};

const IngredientSuggestions = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSelect = (ingredient) => {
    if (!selected.includes(ingredient)) {
      setSelected([...selected, ingredient]);
    }
    if (input === ingredient) {
      setInput('');
    }
  };

  const handleRemove = (ingredient) => {
    setSelected(selected.filter(item => item !== ingredient));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getSuggestions(selected.join(', '));
      setResults(response);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setResults('Error generating suggestions. Please try again.');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      handleSelect(input.trim());
    }
  };

  const TitleBox = ({ children }) => (
    <Box
      position="relative"
      mb={8}
      _after={{
        content: '""',
        position: 'absolute',
        bottom: '-4px',
        left: '0',
        width: '60px',
        height: '4px',
        backgroundColor: 'blue.500',
        borderRadius: 'full'
      }}
    >
      {children}
    </Box>
  );

  return (
    <Box minHeight="100vh" bg="#f5f5dc" py={12}>
      <Container maxWidth="1200px">
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          aria-label="Go back to home"
          size="lg"
          colorScheme="black"
          bg="black"
          boxShadow="md"
          position="absolute"
          top={4}
          left={4}
        />

        <MotionBox
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          textAlign="center"
          mb={12}
        >
          <Heading as="h1" size="xl" color="#333" fontWeight="extrabold" letterSpacing="wide">
            Recipe Generator 🍳
          </Heading>
          <Text mt={2} fontSize="xl" color="gray.600">Discover delicious recipes with your ingredients!</Text>
        </MotionBox>

        <Box bg="white" borderRadius="xl" boxShadow="2xl" p={8}>
          <VStack spacing={12} align="stretch">
            <Box>
              <TitleBox>
                <Heading as="h2" size="lg" mb={2}>
                  Suggested Ingredients
                </Heading>
              </TitleBox>
              <Grid templateColumns="repeat(2, 1fr)" gap={8}>
                {Object.entries(categories).map(([category, items]) => (
                  <Box key={category} bg="gray.50" p={6} borderRadius="lg" boxShadow="md">
                    <Heading as="h3" size="md" mb={4} color="gray.600">
                      {category}
                    </Heading>
                    <Divider mb={4} />
                    <Flex flexWrap="wrap" gap={3}>
                      {items.map(item => (
                        <MotionBox
                          key={item}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            onClick={() => handleSelect(item)}
                            colorScheme={selected.includes(item) ? "blue" : "gray"}
                            variant={selected.includes(item) ? "solid" : "outline"}
                            size="md"
                          >
                            {item}
                          </Button>
                        </MotionBox>
                      ))}
                    </Flex>
                  </Box>
                ))}
              </Grid>
            </Box>

            <Box>
              <TitleBox>
                <Heading as="h2" size="lg" mb={2}>
                  Add Custom Ingredient
                </Heading>
              </TitleBox>
              <Flex>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type an ingredient and press Enter..."
                  size="lg"
                  mr={4}
                />
                <Button
                  onClick={() => handleSelect(input.trim())}
                  colorScheme="blue"
                  isDisabled={!input.trim()}
                  size="lg"
                >
                  Add
                </Button>
              </Flex>
            </Box>

            <Box>
              <TitleBox>
                <Heading as="h3" size="lg" mb={2}>
                  Selected Ingredients
                </Heading>
              </TitleBox>
              <Flex flexWrap="wrap" gap={3}>
                {selected.map(ingredient => (
                  <Tag key={ingredient} size="lg" borderRadius="full" variant="solid" colorScheme="blue">
                    <TagLabel>{ingredient}</TagLabel>
                    <TagCloseButton onClick={() => handleRemove(ingredient)} />
                  </Tag>
                ))}
              </Flex>
            </Box>

            <MotionBox
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              textAlign="center"
            >
              <Button
                onClick={handleSubmit}
                isDisabled={selected.length === 0 || loading}
                colorScheme="blue"
                size="lg"
                px={12}
                py={6}
                borderRadius="lg"
                boxShadow="lg"
                _hover={{
                  boxShadow: 'xl',
                  transform: 'translateY(-2px)'
                }}
                transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                rightIcon={<span>✨</span>}
              >
                {loading ? 'Cooking Up Recipes...' : 'Generate Magic Recipes'}
              </Button>
            </MotionBox>

            {results && (
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                bg="gray.50"
                p={6}
                borderRadius="lg"
                boxShadow="md"
              >
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <Heading as="h1" size="2xl" fontWeight="bold" mb={6} borderBottom="2px" borderColor="blue.500" pb={2} {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <Heading as="h2" size="xl" fontWeight="bold" mb={4} color="blue.600" {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <Heading as="h3" size="lg" fontWeight="bold" mb={3} color="blue.500" {...props} />
                    ),
                    strong: ({ node, ...props }) => <Text as="strong" fontWeight="bold" color="blue.700" {...props} />
                  }}
                >
                  {results}
                </ReactMarkdown>
              </MotionBox>
            )}
          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default IngredientSuggestions;
