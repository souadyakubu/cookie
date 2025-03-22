import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Box, IconButton, Spinner, Center } from '@chakra-ui/react';
import SearchBar from './SearchBar';
import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';
import RecipeCard from './RecipeCard';
import '../css/RecipeView.css';

function RecipeView() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [areas, setAreas] = useState([]);
  const [randomMeals, setRandomMeals] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const [categoriesRes, areasRes, ...randomMealsRes] = await Promise.all([
        fetch('https://www.themealdb.com/api/json/v1/1/categories.php'),
        fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list'),
        ...Array(4).fill(null).map(() => fetch('https://www.themealdb.com/api/json/v1/1/random.php'))
      ]);

      const [categoriesData, areasData, ...randomMealsData] = await Promise.all([
        categoriesRes.json(),
        areasRes.json(),
        ...randomMealsRes.map(res => res.json())
      ]);

      setCategories(categoriesData.categories || []);
      setAreas(areasData.meals || []);
      setRandomMeals(randomMealsData.map(data => data.meals?.[0]).filter(Boolean));
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const searchRecipes = useCallback(async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error searching recipes:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchByCategory = useCallback(async (category) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error searching by category:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchByArea = useCallback(async (area) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch (error) {
      console.error('Error searching by area:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="brown.500" />
      </Center>
    );
  }

  return (
    <div className="RecipeView">
      <Box position="fixed" top={4} left={4} zIndex={1000}>
        <IconButton
          icon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          aria-label="Go back to home"
          size="lg"
          colorScheme="black"
          bg="black"
          boxShadow="md"
        />
      </Box>

      <h1 className="main-title">Recipe Explorer</h1>
      <SearchBar onSearch={searchRecipes} />

      {!selectedRecipe && (
        <>
          {recipes.length === 0 && (
            <div className="home-sections">
              <section className="hero">
                <h2 className="section-title">Featured Recipes</h2>
                <div className="recipe-grid">
                  {randomMeals.map((meal) => (
                    <RecipeCard
                      key={meal.idMeal}
                      recipe={meal}
                      onClick={() => setSelectedRecipe(meal)}
                    />
                  ))}
                </div>
              </section>
              <section className="categories">
                <h2 className="section-title">Popular Categories</h2>
                <div className="category-grid">
                  {categories
                    .filter((category) => category.strCategory !== 'Pork')
                    .map((category) => (
                      <div
                        key={category.idCategory}
                        className="category-card"
                        onClick={() => searchByCategory(category.strCategory)}
                      >
                        <img
                          src={category.strCategoryThumb}
                          alt={category.strCategory}
                          className="category-image"
                        />
                        <h3>{category.strCategory}</h3>
                      </div>
                    ))}
                </div>
              </section>

              <section className="countries">
                <h2 className="section-title">Explore by Country</h2>
                <div className="country-grid">
                  {areas.map((area) => (
                    <button
                      key={area.strArea}
                      className="country-button"
                      onClick={() => searchByArea(area.strArea)}
                    >
                      {area.strArea}
                    </button>
                  ))}
                </div>
              </section>
            </div>
          )}

          {recipes.length > 0 && (
            <RecipeList recipes={recipes} onSelectRecipe={setSelectedRecipe} />
          )}
        </>
      )}

      {selectedRecipe && (
        <RecipeDetail recipe={selectedRecipe} onBack={() => setSelectedRecipe(null)} />
      )}

      <style jsx>{`
        .main-title {
          font-size: 2.5rem;
          color: rgb(70, 63, 63);
          text-align: center;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          border-bottom: 2px solid #f5f5dc;
          padding-bottom: 10px;
        }

        .section-title {
          font-size: 2rem;
          color: rgb(70, 63, 63);
          text-align: center;
          margin-bottom: 2rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          background: linear-gradient(to right, #f5f5dc, #f5f5dc);
          padding: 15px;
          border-radius: 8px;
          box-shadow: inset -3px -3px rgba(255, 255, 255, 0.5), inset -6px -6px rgba(255, 255, 255, 0.3);
        }

        .hero,
        .categories,
        .countries {
          margin-bottom: 3rem;
        }

        .recipe-grid,
        .category-grid,
        .country-grid {
          display: grid;
          gap: 20px;
        }

        .recipe-grid {
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        }

        .category-grid {
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        }

        .country-grid {
          grid-template-columns: repeat(auto-fill, minmax(150px, auto));
        }
      `}</style>
    </div>
  );
}

export default RecipeView;
