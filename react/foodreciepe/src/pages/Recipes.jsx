import { useContext } from "react"
import {recipecontext} from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"

const Recipes = () => {
  const {data} = useContext(recipecontext)
  
  const renderrecipes= data.map((recipe)=>{
    return(
      <RecipeCard key={recipe.id} recipe={recipe}/>
  )})
  return (
    <div className="flex flex-wrap justify-center gap-10" >
      {data.length>0 ? renderrecipes: <h1 className="text-black text-5xl">No recipes yet!! Please check it out later !</h1>}
    </div>
  )
}

export default Recipes
