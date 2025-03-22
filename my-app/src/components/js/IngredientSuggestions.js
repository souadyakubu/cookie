import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getSuggestions } from '../../utils/openAI';

const categories = {
  Vegetables: ['Tomato', 'Carrot', 'Broccoli', 'Spinach', 'Garlic', 'Onion'],
  Proteins: ['Chicken', 'Beef', 'Tofu', 'Eggs', 'Salmon', 'Shrimp'],
  Grains: ['Rice', 'Pasta', 'Quinoa', 'Bread', 'Oats', 'Barley'],
  Dairy: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 'Cottage Cheese']
};

const IngredientSuggestions = () => {
  const [input, setInput] = useState('');
  const [selected, setSelected] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const allIngredients = Object.values(categories).flat();
    const filtered = allIngredients.filter(ingredient =>
      ingredient.toLowerCase().includes(input.toLowerCase()) &&
      !selected.includes(ingredient)
    );
    setSuggestions(filtered.slice(0, 5));
  }, [input, selected]);

  const handleSelect = (ingredient) => {
    setSelected([...selected, ingredient]);
    setInput('');
    setSuggestions([]);
  };

  const handleRemove = (ingredient) => {
    setSelected(selected.filter(item => item !== ingredient));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await getSuggestions(selected.join(', '));
      setResults(response);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      setResults('Error generating suggestions. Please try again.');
    }
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input) {
      handleSelect(input);
    }
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => Math.min(prev + 1, suggestions.length - 1));
    }
    if (e.key === 'ArrowUp') {
      setActiveIndex(prev => Math.max(prev - 1, -1));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">AI Recipe Generator 🍳</h1>

      {/* Category Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Suggested Ingredients</h2>
        {Object.entries(categories).map(([category, items]) => (
          <div key={category} className="mb-4">
            <h3 className="font-medium mb-2">{category}</h3>
            <div className="flex flex-wrap gap-2">
              {items.map(item => (
                <button
                  key={item}
                  onClick={() => handleSelect(item)}
                  className={`px-3 py-1 rounded-full ${selected.includes(item)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Input */}
      <div className="relative mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type or select ingredients..."
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />

        {suggestions.length > 0 && (
          <ul className="absolute z-10 w-full bg-white border rounded-lg mt-1 shadow-lg">
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                onClick={() => handleSelect(suggestion)}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${index === activeIndex ? 'bg-blue-50' : ''
                  }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Selected Ingredients */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {selected.map(ingredient => (
            <div
              key={ingredient}
              className="bg-blue-100 px-3 py-1 rounded-full flex items-center gap-2"
            >
              {ingredient}
              <button
                onClick={() => handleRemove(ingredient)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={selected.length === 0 || loading}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
      >
        {loading ? 'Generating Recipes...' : 'Generate Recipes'}
      </button>

      {/* Results */}
      {results && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <div className="prose">
            <ReactMarkdown>{results}</ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  );
};

export default IngredientSuggestions;
