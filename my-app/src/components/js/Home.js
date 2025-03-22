// src/components/js/Home.js
import React from 'react';
import { Box, Heading, Flex } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import '../css/Home.css';

const MotionBox = motion(Box);

function Home() {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bg="#f5f5dc" // Minimalist beige background
      p={4}
    >
      <Heading as="h1" size="2xl" color="#333" mb={12}>
        Welcome to Cookie 🍪
      </Heading>
      <Flex justify="center" gap={12}>
        {/* Recipe Viewing Circle */}
        <MotionBox
          whileHover={{ scale: 1.2 }}
          whileTap={{ rotate: 360 }}
          borderRadius="full"
          bg="white"
          boxShadow="2xl"
          width="200px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate('/recipe-viewing')} // Navigate to Recipe Viewing page
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <img
              src="/img/A.gif" // Recipe Viewing GIF
              alt="Recipe Viewing"
              style={{ width: '100px', height: '100px' }}
            />
          </motion.div>
        </MotionBox>

        {/* Ingredient Suggestions Circle */}
        <MotionBox
          whileHover={{ scale: 1.2 }}
          whileTap={{ rotate: 360 }}
          borderRadius="full"
          bg="white"
          boxShadow="2xl"
          width="200px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate('/ingredient-suggestions')} // Navigate to Ingredient Suggestions page
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <img
              src="/img/B.gif" // Ingredient Suggestions GIF
              alt="Ingredient Suggestions"
              style={{ width: '100px', height: '100px' }}
            />
          </motion.div>
        </MotionBox>

        {/* Cooking Simulation Circle */}
        <MotionBox
          whileHover={{ scale: 1.2 }}
          whileTap={{ rotate: 360 }}
          borderRadius="full"
          bg="white"
          boxShadow="2xl"
          width="200px"
          height="200px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => navigate('/cooking-simulation')} // Navigate to Cooking Simulation page
        >
          <motion.div
            animate={{
              rotate: [0, -10, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          >
            <img
              src="/img/C.gif" // Cooking Simulation GIF
              alt="Cooking Simulation"
              style={{ width: '100px', height: '100px' }}
            />
          </motion.div>
        </MotionBox>
      </Flex>
    </Flex>
  );
}

export default Home;
