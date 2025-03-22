import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const RecipeStep = ({ step, isActive, onClick }) => (
    <MotionBox
        p={4}
        borderWidth={1}
        borderRadius="md"
        mb={4}
        cursor="pointer"
        onClick={onClick}
        whileHover={{ scale: 1.02 }}
        bg={isActive ? 'blue.50' : 'white'}
    >
        <Text fontWeight={isActive ? 'bold' : 'normal'}>{step}</Text>
    </MotionBox>
);

export default RecipeStep;
