import { useState, useEffect } from 'react';
import { Box, Text, Image, Heading, Grid, Button, Progress } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useDrag, useDrop } from 'react-dnd';

const MotionBox = motion(Box);

const CookingStep = ({ preparedItems = [], onComplete }) => {
    const [ingredientsInPan, setIngredientsInPan] = useState([]);
    const [cookingProgress, setCookingProgress] = useState(0);
    const [isCooking, setIsCooking] = useState(false);
    const [isCooked, setIsCooked] = useState(false);

    // the drop zone for ingredients
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'cooking-ingredient',
        drop: (item) => {
            if (!ingredientsInPan.includes(item.name)) {
                setIngredientsInPan((prev) => [...prev, item.name]);
            }
        },
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    }));

    // Simulating cooking progress
    useEffect(() => {
        if (isCooking && cookingProgress < 100) {
            const timer = setInterval(() => {
                setCookingProgress((prev) => Math.min(prev + 5, 100));
            }, 300);
            return () => clearInterval(timer);
        }
        if (cookingProgress === 100) {
            setIsCooked(true);
            setIsCooking(false);
        }
    }, [isCooking, cookingProgress]);

    const startCooking = () => {
        if (ingredientsInPan.length > 0) {
            setIsCooking(true);
        }
    };

    return (
        <Box textAlign="center" p={4}>
            <Heading size="md" mb={4}>
                Cooking Station
            </Heading>

            {/* Pan Area */}
            <Box ref={drop} position="relative" mb={8} p={4} borderWidth={2} borderRadius="md" borderColor={isOver ? 'blue.300' : 'gray.200'}>
                <MotionBox
                    animate={isCooking ? { rotate: [0, -2, 2, 0] } : {}}
                    transition={{ duration: 0.5, repeat: Infinity }}
                >
                    <Image
                        src="https://img.icons8.com/ios/500/frying-pan.png"
                        boxSize="150px"
                        objectFit="contain"
                        mx="auto"
                    />
                </MotionBox>

                {/* Ingredients in the pan */}
                <Grid templateColumns="repeat(3, 1fr)" gap={2} mt={4}>
                    {ingredientsInPan.map((item, i) => (
                        <MotionBox
                            key={i}
                            animate={isCooking ? { y: [0, -5], opacity: [1, 0.8] } : {}}
                            transition={{ duration: 0.5, repeat: Infinity }}
                        >
                            <Image
                                src={`https://www.themealdb.com/images/ingredients/${item}-Small.png`}
                                boxSize="50px"
                                objectFit="contain"
                                mx="auto"
                                opacity={isCooked ? 0.6 : 1}
                                filter={isCooked ? 'grayscale(80%)' : 'none'}
                            />
                        </MotionBox>
                    ))}
                </Grid>

                {/* Cooking Progress */}
                {isCooking && (
                    <Progress value={cookingProgress} mt={4} colorScheme="green" borderRadius="md" hasStripe isAnimated />
                )}
            </Box>

            {/* Prepared Ingredients */}
            <Grid templateColumns="repeat(3, 1fr)" gap={4} mt={8}>
                {preparedItems.map((item, i) => (
                    <DraggableCookingIngredient key={i} name={item} used={ingredientsInPan.includes(item)} />
                ))}
            </Grid>

            {!isCooked ? (
                <Button mt={8} colorScheme="green" onClick={startCooking} isDisabled={!ingredientsInPan.length || isCooking}>
                    {isCooking ? `Cooking... ${cookingProgress}%` : 'Start Cooking'}
                </Button>
            ) : (
                <Button mt={8} colorScheme="blue" onClick={onComplete}>
                    Serve Meal 🎉
                </Button>
            )}
        </Box>
    );
};

const DraggableCookingIngredient = ({ name, used }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'cooking-ingredient',
        item: { name },
        canDrag: !used,
        collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
    }));

    return (
        <MotionBox
            ref={drag}
            p={2}
            borderWidth={1}
            borderRadius="md"
            opacity={isDragging ? 0.6 : used ? 0.4 : 1}
            cursor={used ? 'not-allowed' : 'grab'}
            whileHover={{ scale: used ? 1 : 1.05 }}
        >
            <Image
                src={`https://www.themealdb.com/images/ingredients/${name}-Small.png`}
                boxSize="80px"
                objectFit="contain"
                mx="auto"
            />
            <Text mt={2} textAlign="center" fontSize="sm">
                {name}
                {used && ' (in pan)'}
            </Text>
        </MotionBox>
    );
};

export default CookingStep;
