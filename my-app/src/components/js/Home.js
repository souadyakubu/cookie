import React, { useEffect, useState } from 'react';
import { Box, Heading, Flex, IconButton, useToast, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/firebase';
import { FiLogOut } from 'react-icons/fi';

const MotionBox = motion(Box);

function Home() {
  const navigate = useNavigate();
  const toast = useToast();

  const [activeIndex, setActiveIndex] = useState(0);
  const [heldIndex, setHeldIndex] = useState(null);
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = window.innerWidth <= 768;

  useEffect(() => {
    if (!isMobile || isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 2500);

    return () => clearInterval(interval);
  }, [isMobile, isPaused]);

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logged out successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate("/");
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

  // Hold handlers
  const handleHoldStart = (index) => {
    setHeldIndex(index);
    setIsPaused(true);
  };

  const handleHoldEnd = () => {
    setHeldIndex(null);
    setIsPaused(false);
  };

  // Animation configs for each image
  const animations = [
    isPaused ? {} : { y: [0, -10, 0] },
    isPaused ? {} : { scale: [1, 1.2, 1] },
    isPaused ? {} : { rotate: [0, -10, 10, -10, 0] },
  ];

  // Text for each image
  const texts = [
    "Search or View Great Recipes",
    "Get Ingredient Suggestions",
    "Try Our Cooking Simulations",
  ];

  // Image sources and navigation paths
  const images = [
    { src: "/img/A.gif", alt: "Recipe Viewing", path: "/recipe-viewing" },
    { src: "/img/B.gif", alt: "Ingredient Suggestions", path: "/ingredient-suggestions" },
    { src: "/img/C.gif", alt: "Cooking Simulation", path: "/cooking-simulation" },
  ];

  return (
    <Box position="relative" height="100vh" bg="#f5f5dc" p={4} overflowX="hidden">
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

        <Flex
          justify="center"
          gap={6}
          flexWrap="wrap"
          width="100%"
          maxW="100%"
        >
          {images.map((img, idx) => (
            <Box key={img.alt} role="group">
              <MotionBox
                whileHover={{ scale: 1.2 }}
                whileTap={{ rotate: 360 }}
                borderRadius="full"
                bg="white"
                boxShadow="2xl"
                width={["150px", "180px", "200px"]}
                height={["150px", "180px", "200px"]}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                onClick={() => navigate(img.path)}
                position="relative"
                overflow="hidden"
                // Hold handlers (works for mouse and touch)
                onPointerDown={() => handleHoldStart(idx)}
                onPointerUp={handleHoldEnd}
                onPointerLeave={handleHoldEnd}
              >
                <motion.div
                  animate={animations[idx]}
                  transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }}
                >
                  <img src={img.src} alt={img.alt} style={{ width: '100px', height: '100px' }} />
                </motion.div>
                {/* Show text if:
                  - heldIndex === idx (held), OR
                  - not mobile (always show), OR
                  - activeIndex === idx and not holding (auto cycle)
                */}
                {((heldIndex === idx) || (!isMobile && heldIndex === null) || (activeIndex === idx && heldIndex === null)) && (
                  <Text
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    bg="rgba(0,0,0,0.7)"
                    color="white"
                    p={2}
                    textAlign="center"
                    opacity={{ base: 1, md: 0 }}
                    transition="opacity 0.3s"
                    _groupHover={{ opacity: 1 }}
                  >
                    {texts[idx]}
                  </Text>
                )}
              </MotionBox>
            </Box>
          ))}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Home;
