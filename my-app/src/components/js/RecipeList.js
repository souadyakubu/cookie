import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onSelectRecipe }) {
  return (
    <div className="recipe-list-container">
      <div className="recipe-list">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.idMeal}
            recipe={recipe}
            onClick={() => onSelectRecipe(recipe)}
          />
        ))}
      </div>
      <style jsx>{`
        .recipe-list-container {
          margin: 2rem 0;
        }
        .recipe-list-container h2 {
          text-align: center;
          color: #964b00;
          margin-bottom: 1.5rem;
        }
        .recipe-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 2rem;
        }
      `}</style>
    </div>
  );
}

export default RecipeList;
