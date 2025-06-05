import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import { getSuggestions } from '../../utils/openAI';
import { Box, Flex, Heading, Input, Button, VStack, Tag, TagLabel, TagCloseButton, IconButton, Text, Grid, Container, Divider } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const categories = {
  Vegetables: ['Tomato', 'Carrot', 'Garlic', 'Onion', 'Spinach'],
  Proteins: ['Chicken', 'Beef', 'Shrimp', 'Eggs', 'Salmon'],
  Grains: ['Barley', 'Pasta', 'Wheet', 'Oats', 'Rice'],
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
              <Grid templateColumns={{ base: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
                {Object.entries(categories).map(([category, items]) => (
                  <Box key={category} bg="gray.50" p={3} borderRadius="md" boxShadow="sm">
                    <Heading as="h3" size="sm" mb={2} color="gray.700" fontWeight="semibold">
                      {category}
                    </Heading>
                    <Divider mb={2} />
                    <Flex flexWrap="wrap" gap={2}>
                      {items.map(item => (
                        <Button
                          key={item}
                          onClick={() => handleSelect(item)}
                          colorScheme={selected.includes(item) ? "blue" : "gray"}
                          variant={selected.includes(item) ? "solid" : "outline"}
                          size="sm"
                          borderRadius="full"
                          px={3}
                          py={1}
                        >
                          {item}
                        </Button>
                      ))}
                    </Flex>
                  </Box>
                ))}
              </Grid>

            </Box>

            <Box bg="gray.50" p={6} borderRadius="xl" boxShadow="md">
              <TitleBox>
                <Heading as="h2" size="lg" mb={4}>
                  Add Custom Ingredient
                </Heading>
              </TitleBox>
              <Flex direction={{ base: 'column', md: 'row' }} gap={4}>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type an ingredient and press Enter..."
                  size="lg"
                  flex="1"
                  borderRadius="full"
                  bg="white"
                />
                <Button
                  onClick={() => handleSelect(input.trim())}
                  colorScheme="blue"
                  isDisabled={!input.trim()}
                  size="lg"
                  borderRadius="full"
                  px={8}
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
                borderRadius="3xl"
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
                p={8}
                borderRadius="lg"
                boxShadow="lg"
                maxW="3xl"
                mx="auto"
              >
                <Heading size="lg" mb={4} color="blue.700" textAlign="center">
                  Your Recipe Suggestions
                </Heading>
                <Divider mb={6} />

                <Box as="article" className="recipe-markdown">
                  <ReactMarkdown
                    components={{
                      h1: ({ node, ...props }) => (
                        <Heading as="h1" size="lg" mb={4} mt={8} color="blue.800" {...props} />
                      ),
                      h2: ({ node, ...props }) => (
                        <Heading as="h2" size="md" mb={3} mt={6} color="blue.600" {...props} />
                      ),
                      h3: ({ node, ...props }) => (
                        <Heading as="h3" size="sm" mb={2} mt={4} color="blue.500" {...props} />
                      ),
                      p: ({ node, ...props }) => <Text fontSize="md" mb={4} lineHeight="1.6" color="gray.700" {...props} />,
                      li: ({ node, ...props }) => (
                        <Box as="li" ml={6} mb={2} fontSize="md" color="gray.700" listStyleType="disc" {...props} />
                      ),
                      strong: ({ node, ...props }) => <Text as="strong" fontWeight="semibold" color="blue.700" {...props} />,
                      ul: ({ node, ...props }) => <Box as="ul" pl={4} mb={4} {...props} />,
                    }}
                  >
                    {results}
                  </ReactMarkdown>
                </Box>
              </MotionBox>
            )}

          </VStack>
        </Box>
      </Container>
    </Box>
  );
};

export default IngredientSuggestions;
