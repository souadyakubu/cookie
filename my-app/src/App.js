import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./services/firebase";
import { Box, Spinner } from "@chakra-ui/react";
import Signup from "./components/js/Signup";
import Login from "./components/js/Login";
import Home from "./components/js/Home";
import RecipeViewing from './components/js/RecipeView';
import IngredientSuggestions from './components/js/IngredientSuggestions';
import CookingSimulation from './components/js/CookingSimulation';
import SavedMeals from './components/js/SavedMeals';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" thickness="4px" speed="0.65s" color="blue.500" />
      </Box>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/signup" element={user ? <Navigate to="/home" /> : <Signup />} />

        {/* Protected Routes */}
        <Route path="/home" element={user ? <Home /> : <Navigate to="/" />} />
        <Route path="/recipe-viewing" element={user ? <RecipeViewing /> : <Navigate to="/" />} />
        <Route path="/ingredient-suggestions" element={user ? <IngredientSuggestions /> : <Navigate to="/" />} />
        <Route path="/cooking-simulation" element={user ? <CookingSimulation /> : <Navigate to="/" />} />
        <Route path="/saved-meals" element={user ? <SavedMeals /> : <Navigate to="/" />} />

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/"} />} />
      </Routes>
    </Router>
  );
};

export default App;
