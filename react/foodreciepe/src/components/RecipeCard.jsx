import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { RiHeartFill } from "@remixicon/react";
import { recipecontext } from "../context/RecipeContext";

const RecipeCard = (props) => {
  const { id, image, title, description, category, instructions, ingredients } =props.recipe
  const [expanded, setExpanded] = useState(false);
  const { favv, updateFav } = useContext(recipecontext);
  return (
    <div
      className="cursor-pointer block w-[23vw] p-3 bg-[#3C3D37] rounded overflow-hidden shadow transition-all duration-300"
    >
      <RiHeartFill
            size={36} // set custom `width` and `height`
            onClick={()=>updateFav(id)}
            color={favv.includes(id)?"red" :"white"} // set `fill` color
            className="outline-0 absolute " // add custom class name
        />
      <img className="object-cover w-full h-[40vh]" src={image} alt="image" />
      <h1 className="px-2 mt-3 text-2xl">{title}</h1>
      <p className="px-2 pb-3 desc text-sm text-gray-200">
        <span className="text-white font-semibold">Description</span> :{" "}
        {expanded
          ? description
          : description.length > 100
          ? description.slice(0, 100) + "..."
          : description}
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-blue-400  ml-2 cursor-pointer  "
        >
          {expanded ? "See less" : "See more"}
        </button>
      </p>

      {expanded && (
        <>
          <h3 className="px-2 text-sm text-white mt-[-2%]">
            <span className="font-semibold">Category</span> : {category}
          </h3>
          <h3 className="px-2 text-sm text-white">
            <span className="font-semibold">Instructions</span> : {instructions}
          </h3>
          <h3 className="px-2 text-sm text-white">
            <span className="font-semibold">Ingredients</span> : {ingredients}
          </h3>
          
          <Link
            to={`/recipes/details/${id}`}
            className="block mt-2 px-2 text-blue-300 "
          >
            <h1>To update or delete recipe click here</h1>
            
          </Link>
          
        </>
      )}
    </div>
  );
};

export default RecipeCard;
