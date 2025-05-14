# Project Overview: What's 🍪'n?

This project is a comprehensive cooking application built using React and Firebase, featuring three interconnected modules designed to enhance the home cooking experience. Rather than simply displaying basic recipes, this application provides an interactive platform where users can explore recipes by category or region, get AI-powered ingredient suggestions, and engage in interactive cooking simulations.

---

## Core Features

### 1. Recipe Viewing

The recipe viewing module serves as a robust recipe explorer allowing users to:

- Browse featured recipes using the TheMealDB API
- Filter recipes by categories (e.g., Breakfast, Dessert, Vegetarian)
- Explore recipes by country of origin 
- Search for specific recipes with an intuitive search interface
- Save favorite meals to a personal collection
- View detailed recipe information including ingredients, measurements, instructions, and even video tutorials

Key UI Features:

- Dynamic recipe loading with loading states
- Pagination through different recipe views
- Interactive recipe cards with hover effects
- Detailed recipe pages with multimedia content

Built with Chakra UI components and Framer Motion for responsive, animated design.

---

### 2. Ingredient Suggestions

This module leverages OpenAI to generate recipe ideas based on ingredients users have:

- Select from suggested ingredient categories (Vegetables, Proteins, Grains, Dairy)
- Add custom ingredients
- Send selected items to OpenAI via the `getSuggestions` utility
- Receive Markdown-formatted, AI-generated recipes
- Render with `ReactMarkdown` and custom styles

Includes an animated tag-based selection interface and responsive grid layout.

---

### 3. Cooking Simulation

Offers a gamified, step-by-step cooking experience:

- Choose a meal from TheMealDB
- Simulate meal preparation via drag-and-drop (React DnD)
- Follow timed cooking steps
- Interact with virtual tools
- Track performance based on accuracy and speed

Phases include:

- Meal selection
- Ingredient prep
- Cooking
- Plating and scoring

---

## Technical Implementation

Built using:

- **React** (with hooks and functional components)
- **Firebase** for auth and data storage
- **Chakra UI** for accessible, styled components
- **Framer Motion** for animations
- **React Router DOM** for routing
- **Axios** for API calls
- **React DnD** for cooking simulation
- **OpenAI API** for AI-generated suggestions
- **ReactMarkdown** for recipe rendering
- **React Icons** for visual elements

The app follows a mobile-first, responsive design pattern with attention to accessibility and interactive user experience.

---

## Getting Started

To run the application locally, follow these steps:

```bash
# Clone the repository
git clone <your-repo-url>
cd <your-project-root>

# Navigate to the frontend project directory
cd my-app

# Install dependencies
npm install

# Start the development server
npm start

