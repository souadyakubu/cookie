import React from 'react';

function RecipeDetail({ recipe, onBack }) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    if (recipe[`strIngredient${i}`]) {
      ingredients.push(`${recipe[`strIngredient${i}`]} - ${recipe[`strMeasure${i}`]}`);
    }
  }

  return (
    <div className="recipe-detail">
      <a onClick={onBack} className="back-link">
        <span className="arrow">&#8592;</span> Back to list
      </a>
      <h2>{recipe.strMeal}</h2>
      <div className="recipe-image">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} />
      </div>
      <div className="recipe-info">
        <h3>Ingredients:</h3>
        <ul className="ingredients-list">
          {ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-instructions">
        <h3>Instructions:</h3>
        <p>{recipe.strInstructions}</p>
      </div>
      {recipe.strYoutube && (
        <div className="recipe-video">
          <h3>Video Tutorial:</h3>
          <div className="video-container">
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${recipe.strYoutube.split('v=')[1]}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
      <style jsx>{`
        .recipe-detail {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          background-color: #fff;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .back-link {
          color: #333;
          text-decoration: none;
          font-size: 1rem;
          cursor: pointer;
          display: inline-block;
          margin-bottom: 1rem;
        }
        .back-link:hover {
          text-decoration: underline;
        }
        .arrow {
          font-size: 1.2rem;
          margin-right: 0.5rem;
        }
        .recipe-detail h2 {
          color: #964b00;
          margin-bottom: 1.5rem;
        }
        .recipe-image {
          margin-bottom: 2rem;
        }
        .recipe-image img {
          width: 100%;
          border-radius: 10px;
        }
        .recipe-info {
         color: #964b00;
          margin-bottom: 2rem;
        }
        .ingredients-list {
        color:rgb(17, 17, 10);
          list-style-type: none;
          padding: 0;
        }
        .ingredients-list li {
          margin-bottom: 0.5rem;
        }
        .recipe-instructions h3,
        .recipe-video h3 {
          color: #964b00;
          margin-top: 1.5rem;
        }
        .video-container {
          position: relative;
          padding-bottom: 56.25%;
          height: 0;
          overflow: hidden;
          margin-top: 1rem;
        }
        .video-container iframe {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default RecipeDetail;
