import { IconButton, Box } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const RecipeCard = ({ recipe, onClick, isSaved }) => {
  const navigate = useNavigate();

  const handleSaveToggle = (e) => {
    e.stopPropagation();
    const saved = JSON.parse(localStorage.getItem('savedMeals') || '[]');

    if (isSaved) {
      const updated = saved.filter(m => m.idMeal !== recipe.idMeal);
      localStorage.setItem('savedMeals', JSON.stringify(updated));
    } else {
      localStorage.setItem('savedMeals', JSON.stringify([...saved, recipe]));
    }
    navigate(0);
  };

  return (
    <Box
      position="relative"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={onClick}
      _hover={{ transform: 'scale(1.05)' }}
      transition="transform 0.2s"
    >
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        style={{ width: '100%', height: '200px', objectFit: 'cover' }}
      />
      <Box p={4}>
        <h3 style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{recipe.strMeal}</h3>
      </Box>
      <IconButton
        icon={<StarIcon color={isSaved ? "yellow.400" : "gray.300"} />}
        position="absolute"
        top={2}
        right={2}
        aria-label={isSaved ? "Remove from saved" : "Save meal"}
        onClick={handleSaveToggle}
        bg="white"
        borderRadius="full"
        boxShadow="md"
        _hover={{ bg: "gray.100" }}
      />
    </Box>
  );
};

export default RecipeCard;
