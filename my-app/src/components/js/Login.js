import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmailAndPassword } from '../../services/firebase';
import { Box, Flex, Heading, Input, Button, Text, useToast } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            toast({
                title: "Error",
                description: "Please fill in all fields.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            setIsLoading(true);

            const { user, error: loginError } = await loginWithEmailAndPassword(email, password);

            if (loginError) {
                throw new Error(loginError);
            }

            if (user) {
                onLogin?.();
                navigate('/home');
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
                {/* Logo Section */}
                <Flex justify="center" mb={6}>
                    <img
                        src="/img/a.png"
                        alt="Logo"
                        style={{ width: '150px', height: 'auto' }}
                    />
                </Flex>

                <Heading as="h2" size="xl" color="#333" mb={6} textAlign="center">
                    Login
                </Heading>

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
                    mb={6}
                    disabled={isLoading}
                />

                <Button
                    onClick={handleLogin}
                    isLoading={isLoading}
                    loadingText="Logging in..."
                    colorScheme="blue"
                    width="100%"
                >
                    Login
                </Button>

                <Text mt={4} color="#666" textAlign="center">
                    Don't have an account?{' '}
                    <Link to="/signup" style={{ color: '#007bff', textDecoration: 'underline' }}>
                        Sign up
                    </Link>
                </Text>
            </MotionBox>
        </Flex>
    );
};

export default Login;
