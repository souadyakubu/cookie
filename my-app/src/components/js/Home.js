import React from 'react';
import { Box, Heading, Flex, IconButton, useToast, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/firebase';
import { FiLogOut } from 'react-icons/fi'; // Logout icon

const MotionBox = motion(Box);

function Home() {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/"); // Redirect to login page after logout
    } catch (error) {
      toast({
        title: "Logout failed",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box position="relative" height="100vh" bg="#f5f5dc" p={4}>
      {/* Logout Icon */}
      <IconButton
        icon={<FiLogOut />}
        onClick={handleLogout}
        position="absolute"
        top={4}
        right={4}
        colorScheme="red"
        variant="ghost"
        aria-label="Logout"
      />

      {/* Main Content */}
      <Flex direction="column" align="center" justify="center" height="100%">
        <Heading as="h1" size="2xl" color="#333" mb={12}>
          What's  🍪'n?
        </Heading>

        <Flex justify="center" gap={12}>
          {/* Recipe Viewing */}
          <Box role="group">
            <MotionBox
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 360 }}
              borderRadius="full"
              bg="white"
              boxShadow="2xl"
              width="200px"
              height="200px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate('/recipe-viewing')}
              position="relative"
              overflow="hidden"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
              >
                <img src="/img/A.gif" alt="Recipe Viewing" style={{ width: '100px', height: '100px' }} />
              </motion.div>
              <Text
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="rgba(0,0,0,0.7)"
                color="white"
                p={2}
                textAlign="center"
                opacity="0"
                transition="opacity 0.3s"
                _groupHover={{ opacity: 1 }}
              >
                Search or View Great Recipes
              </Text>
            </MotionBox>
          </Box>

          {/* Ingredient Suggestions */}
          <Box role="group">
            <MotionBox
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 360 }}
              borderRadius="full"
              bg="white"
              boxShadow="2xl"
              width="200px"
              height="200px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate('/ingredient-suggestions')}
              position="relative"
              overflow="hidden"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
              >
                <img src="/img/B.gif" alt="Ingredient Suggestions" style={{ width: '100px', height: '100px' }} />
              </motion.div>
              <Text
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="rgba(0,0,0,0.7)"
                color="white"
                p={2}
                textAlign="center"
                opacity="0"
                transition="opacity 0.3s"
                _groupHover={{ opacity: 1 }}
              >
                Get Ingredient Suggestions
              </Text>
            </MotionBox>
          </Box>

          {/* Cooking Simulation */}
          <Box role="group">
            <MotionBox
              whileHover={{ scale: 1.2 }}
              whileTap={{ rotate: 360 }}
              borderRadius="full"
              bg="white"
              boxShadow="2xl"
              width="200px"
              height="200px"
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              onClick={() => navigate('/cooking-simulation')}
              position="relative"
              overflow="hidden"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
              >
                <img src="/img/C.gif" alt="Cooking Simulation" style={{ width: '100px', height: '100px' }} />
              </motion.div>
              <Text
                position="absolute"
                bottom="0"
                left="0"
                right="0"
                bg="rgba(0,0,0,0.7)"
                color="white"
                p={2}
                textAlign="center"
                opacity="0"
                transition="opacity 0.3s"
                _groupHover={{ opacity: 1 }}
              >
                Try Our Cooking Simulations
              </Text>
            </MotionBox>
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Home;
