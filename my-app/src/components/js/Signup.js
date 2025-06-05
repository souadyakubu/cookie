import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerWithEmailAndPassword, auth } from '../../services/firebase';
import { updateProfile } from 'firebase/auth';
import { Box, Flex, Heading, Input, Button, Text, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Signup = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSignUp = async () => {
        // Validating inputs
        if (!username || !email || !password || !confirmPassword) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (password.length < 6) {
            toast({
                title: "Error",
                description: "Password should be at least 6 characters long.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            setIsLoading(true);
            const { user, error: registerError } = await registerWithEmailAndPassword(email, password);

            if (registerError) {
                throw new Error(registerError);
            }

            if (user) {
                await updateProfile(auth.currentUser, {
                    displayName: username,
                });
                navigate('/');
            }
        } catch (err) {
            toast({
                title: "Error",
                description: err.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex
            direction="column"
            align="center"
            justify="center"
            height="100vh"
            bg="#f5f5dc"
            p={4}
        >
            <MotionBox
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="2xl"
                width="100%"
                maxWidth="400px"
            >
                <Heading as="h2" size="xl" color="#333" mb={6} textAlign="center">
                    Sign Up
                </Heading>
                <Input
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    mb={4}
                    disabled={isLoading}
                />
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    mb={4}
                    disabled={isLoading}
                />
                <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    mb={4}
                    disabled={isLoading}
                />
                <Input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    mb={6}
                    disabled={isLoading}
                />
                <Button
                    onClick={handleSignUp}
                    isLoading={isLoading}
                    loadingText="Signing up..."
                    colorScheme="blue"
                    width="100%"
                >
                    Sign Up
                </Button>
                <Text mt={4} color="#666" textAlign="center">
                    Already have an account?{' '}
                    <Link to="/" style={{ color: '#007bff', textDecoration: 'underline' }}>
                        Log in
                    </Link>
                </Text>
            </MotionBox>
        </Flex>
    );
};

export default Signup;
