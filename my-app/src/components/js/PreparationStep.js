import React, { useState } from 'react';
import { Box, Heading, Grid, Image, Text, Button } from '@chakra-ui/react';
import { useDrop } from 'react-dnd';
import DraggableIngredient from './DraggableIngredient';

const PreparationStep = ({ ingredients, tools, onComplete }) => {
    const [prepared, setPrepared] = useState([]);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item, monitor) => {
            if (monitor.didDrop()) return;
            if (!prepared.includes(item.name)) {
                setPrepared(prev => [...prev, item.name]);
            }
        },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    }));


    const allPrepared = ingredients.length === prepared.length;

    return (
        <Box ref={drop} bg={isOver ? 'blue.50' : 'white'} p={4} borderRadius="md">
            <Heading size="md" mb={4}>Preparation Station</Heading>

            <Grid templateColumns="repeat(3, 1fr)" gap={4} mb={8}>
                <ToolDropZone tool={tools.knife} label="Chopping Station" />
                <ToolDropZone tool={tools.cuttingBoard} label="Cutting Board" />
                <ToolDropZone tool={tools.pan} label="Cooking Pan" />
            </Grid>

            <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                {ingredients.map((ingredient, i) => (
                    <DraggableIngredient
                        key={ingredient.name}
                        ingredient={ingredient}
                        isPrepared={prepared.includes(ingredient.name)}
                        onDoubleClick={() => setPrepared(prev =>
                            prev.filter(name => name !== ingredient.name)
                        )}
                    />
                ))}
            </Grid>

            <Button
                mt={8}
                colorScheme="green"
                onClick={() => onComplete(prepared)}
                disabled={!allPrepared}
            >
                {allPrepared ? 'All Prepared!' : `Prepared: ${prepared.length}/${ingredients.length}`}
            </Button>
        </Box>
    );
};

const ToolDropZone = ({ tool, label }) => {
    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item, monitor) => { },
        collect: monitor => ({
            isOver: !!monitor.isOver(),
            canDrop: !!monitor.canDrop()
        })
    }));

    return (
        <Box
            ref={drop}
            p={4}
            borderWidth={2}
            borderColor={canDrop ? (isOver ? 'green.300' : 'green.100') : 'gray.100'}
            borderRadius="md"
            textAlign="center"
        >
            <Image
                src={tool}
                boxSize="80px"
                objectFit="contain"
                mx="auto"
                filter={isOver ? 'brightness(1.1)' : 'none'}
            />
            <Text mt={2} fontSize="sm" color="gray.600">
                {label}
            </Text>
        </Box>
    );
};

export default PreparationStep;
