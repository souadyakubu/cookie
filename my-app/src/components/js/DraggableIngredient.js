import React from 'react';
import { useDrag } from 'react-dnd';
import { Box, Image, Text } from '@chakra-ui/react';

const DraggableIngredient = ({ ingredient, isPrepared, onDoubleClick }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'ingredient',
        item: { name: ingredient.name },
        collect: monitor => ({ isDragging: !!monitor.isDragging() })
    }));

    return (
        <Box
            ref={drag}
            opacity={isDragging ? 0.6 : 1}
            cursor="move"
            position="relative"
            onDoubleClick={onDoubleClick}
            transition="all 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
        >
            <Image
                src={ingredient.image}
                alt={ingredient.name}
                boxSize="100px"
                objectFit="contain"
                mx="auto"
                borderRadius="md"
                border={isPrepared ? '2px solid green' : '2px solid transparent'}
            />
            <Text
                mt={2}
                textAlign="center"
                fontSize="sm"
                fontWeight={isPrepared ? 'bold' : 'normal'}
                color={isPrepared ? 'green.600' : 'gray.700'}
            >
                {ingredient.name}
            </Text>
            {isPrepared && (
                <Text
                    position="absolute"
                    top="-5px"
                    right="-5px"
                    bg="green.500"
                    color="white"
                    borderRadius="full"
                    boxSize="25px"
                    fontSize="xs"
                    fontWeight="bold"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    ✓
                </Text>
            )}
        </Box>
    );
};

export default DraggableIngredient;
