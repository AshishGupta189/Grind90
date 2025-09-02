import { useContext, useEffect, useState } from "react"
import {recipecontext} from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"

const Fav = () => {
    const { data, favv } = useContext(recipecontext);
    const filtered = data.filter(recipe => favv.includes(recipe.id));
    const renderrecipes =filtered.map((recipe)=>{
        return(   
        <RecipeCard key={recipe.id} recipe={recipe}/>
        )
    })
  return (
    <div className="flex flex-wrap justify-center gap-10" >
      {filtered.length>0 ? renderrecipes: <h1 className="text-black text-5xl">No favorites yet!! Please check it out later !</h1>}
    </div>
  )
}

export default Fav
