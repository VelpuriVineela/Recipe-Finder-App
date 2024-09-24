import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AiFillPushpin } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);

  const [loading, setLoading] = useState(false);

  const { id } = useParams();

  const APP_ID = import.meta.env.VITE_APP_ID;
  const APP_KEY = import.meta.env.VITE_APP_KEY;

  const fetchRecipe = async (id) => {
    const url = `https://api.edamam.com/search?r=http://www.edamam.com/ontologies/edamam.owl%23${id}&app_id=${APP_ID}&app_key=${APP_KEY}`;

    const response = await fetch(url);

    const data = await response.json();

    return data[0];
  };

  const getRecipe = async (id) => {
    try {
      setLoading(true);
      // Fetch the current recipe by its ID
      const data = await fetchRecipe(id);
      setRecipe(data);

      // console.log(data);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getRecipe(id);
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-[100vh] flex items-center justify-center">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-[#faf9fb] flex-1 p-10 min-h-screen">
      <div className="max-w-screen-lg mx-auto">
        <p className="font-bold text-3xl md:text-5xl my-4">{recipe?.label}</p>
        <a
          href={`https://www.youtube.com/results?search_query=${recipe?.label} recipe`}
          target="_blank"
        >
          <img
            src={recipe?.image}
            alt="reciep_image"
            className="rounded-md w-full h-[60vh] object-cover cursor-pointer opacity-0 transition-opacity duration-500"
            onLoad={(e) => {
              e.currentTarget.style.opacity = 1;
              e.currentTarget.previousElementSibling.style.display = "none";
            }}
          />
        </a>

        <div className="flex gap-10 items-center justify-center p-4">
          {/* Calories */}
          <div className="flex flex-col justify-between">
            <span className="text-black text-center border border-green-500 py-1.5 px-3 rounded-full mb-2">
              {recipe?.calories?.toFixed(2)}
            </span>
            <p className="text-black text-[12px] md:text-md ml-3">CALORIES</p>
          </div>

          {/* Total Time */}
          <div className="flex flex-col justify-center">
            <span className="text-black text-center border border-green-500 p-2 rounded-full mb-2 ">
              {recipe?.totalTime || "N/A"} mins
            </span>
            <p className="text-black text-[12px] md:text-md">TOTAL TIME</p>
          </div>

          {/* Servings */}
          <div className="flex flex-col justify-center">
            <span className="text-black text-center border border-green-500 py-1.5 rounded-full mb-2">
              {recipe?.yield}
            </span>
            <p className="text-black text-[12px] md:text-md">SERVINGS</p>
          </div>
        </div>

        <div className="w-full md:w-2/4  pr-1">
          {/* Ingredients */}
          <div className="flex flex-col gap-5">
            <p className="text-green-700 text-2xl underline">Ingredients</p>
            {recipe?.ingredientLines?.map((ingredient, index) => (
              <p key={index} className="text-black flex gap-2">
                <AiFillPushpin className="text-green-800 text-xl" />{" "}
                {ingredient}
              </p>
            ))}
          </div>

          {/* Health Labels */}
          <div className="flex flex-col gap-3 mt-20">
            <p className="text-green-700 text-2xl underline">Health Labels</p>
            <div className="flex flex-wrap gap-4">
              {recipe?.healthLabels?.map((item, index) => (
                <p
                  key={index}
                  className="text-black flex gap-2 bg-[#fff5f518] px-4 py-1 rounded-full"
                >
                  <BsPatchCheck color="green" /> {item}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;
