import React from 'react';

const RecipeCard = ({ recipe, onClick }) => {
    return (
        <div className="recipe-card" onClick={onClick}>
            <div className="recipe-card-image">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} />
            </div>
            <div className="recipe-card-content">
                <h3>{recipe.strMeal}</h3>
                <p>{recipe.strArea} | {recipe.strCategory}</p>
            </div>
            <style jsx>{`
        .recipe-card {
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s;
          cursor: pointer;
          margin-bottom: 20px;
        }
        .recipe-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
        .recipe-card-image img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .recipe-card-content {
          padding: 1rem;
        }
        .recipe-card-content h3 {
          margin: 0 0 0.5rem;
          font-size: 1.2rem;
          color: #964b00;
        }
        .recipe-card-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #786c3b;
        }
      `}</style>
        </div>
    );
};

export default RecipeCard;
