import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/js/Signup";
import Login from "./components/js/Login";
import Home from "./components/js/Home";
import RecipeViewing from './components/js/RecipeView';
import IngredientSuggestions from './components/js/IngredientSuggestions';
import CookingSimulation from './components/js/CookingSimulation';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/recipe-viewing" element={<RecipeViewing />} />
        <Route path="/ingredient-suggestions" element={<IngredientSuggestions />} />
        <Route path="/cooking-simulation" element={<CookingSimulation />} />
      </Routes>
    </Router>
  );
};

export default App;
