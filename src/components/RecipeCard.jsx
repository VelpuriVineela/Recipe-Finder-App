import React, { useState } from "react";
import { Heart, HeartPulse, Soup } from "lucide-react";
import { Link } from "react-router-dom";

const getTwoValuesFromArray = (arr) => {
  return [arr[0], arr[1]];
};
const RecipeCard = ({ recipe, bg, badge }) => {
  const healthLabels = getTwoValuesFromArray(recipe.healthLabels);

  const { uri } = recipe;

  const id = uri?.split("#")[1];

  const [isFavorite, setIsFavorite] = useState(
    localStorage.getItem("favorites")?.includes(recipe.label)
  );

  const addRecipeToFavorites = () => {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const isRecipeAlreadyInFavorites = favorites.some(
      (fav) => fav.label === recipe.label
    );

    if (isRecipeAlreadyInFavorites) {
      favorites = favorites.filter((fav) => fav.label !== recipe.label);
      setIsFavorite(false);
    } else {
      favorites.push(recipe);
      setIsFavorite(true);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
  };

  return (
    <Link to={`/recipes/${id}`}>
      <div
        className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
      >
        <a className="relative h-32">
          <div className="skeleton absolute inset-0" />
          <img
            src={recipe.image}
            alt="reciep_image"
            className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
            onLoad={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.previousElementSibling.style.display = "none";
            }}
          />
          <div className="absolute left-2 bottom-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
            <Soup size={16} /> {recipe.yield} Servings
          </div>

          <div
            className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              addRecipeToFavorites();
            }}
          >
            {!isFavorite && (
              <Heart
                size={20}
                className="hover:fill-red-500 hover:text-red-500"
              />
            )}
            {isFavorite && (
              <Heart size={20} className="fill-red-500 text-red-500" />
            )}
          </div>
        </a>

        <div className="flex mt-1">
          <p className="font-bold tracking-wide">{recipe.label}</p>
        </div>

        <p className="my-2">
          {recipe.cuisineType[0].charAt(0).toUpperCase() +
            recipe.cuisineType[0].slice(1)}{" "}
          Kitchen
        </p>

        <div className="flex gap-2 mt-auto">
          {healthLabels.map((label, index) => (
            <div
              key={index}
              className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
            >
              <HeartPulse size={16} />
              <span className="text-sm tracking-tighterfont-semibold">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;
