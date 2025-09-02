import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { recipecontext } from "../context/RecipeContext"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";

const SingleRecipe = () => {
    const params=useParams()
    const {data,setdata} =useContext(recipecontext)
    const recipe = data.find((recipe) => params.id ==recipe.id)
    console.log(recipe);
      
        const navigate= useNavigate()
      const {
        register,
        handleSubmit
      }=useForm({
        defaultValues:{
            title:recipe?.title,
            image:recipe?.image, 
            description:recipe?.description,
            ingredients:recipe?.ingredients,
            instructions:recipe?.instructions,
            category:recipe?.category
        }
      });
      const SubmitHandler= (recipe)=>{
        const idx=data.findIndex((recipe) => params.id==recipe.id);
        const copydata = [...data]
        copydata[idx] = {...copydata[idx],...recipe}
        setdata(copydata);
        toast.success("Recipe updated!!!")
        localStorage.setItem("recipe" , JSON.stringify(copydata))
        navigate("/recipes")
      }

      const deleteHandler =() =>{
        const filterdata= data.filter((r)=> r.id!=params.id);
        setdata(filterdata);
        toast.error("Recipe deleted !!")
        localStorage.setItem("recipe" , JSON.stringify(filterdata))
        navigate("/")
      }
    
  return (
    <div className="w-[70%] m-auto px-15 py-7 justify-center   flex bg-[#697565]">
      <div className="left w-1/2 p-2">
        <h1 className="text-4xl text-black">{recipe.title}</h1>
        <img src={recipe.image} alt="image" className="w-[70%] mt-5 rounded h-[34vh]" />
      </div>
      <form className="w-1/2 px-5 py-2"  onSubmit={handleSubmit(SubmitHandler)}>
            <input 
            className=" block border-b outline-0 p-2 w-[100%] border-[#ECDFCC] "
            {...register("title")}
            type="text" placeholder="Recipe title" />

            <input 
            className=" block border-b outline-0 p-2 w-[100%] "
            {...register("image")}
            type="url" placeholder="Enter image url" />

            <select
              className=" block border-b outline-0 p-2  w-[100%] bg-[#697565]"
              {...register("category")}>
                <option value="breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Beverages">Beverages</option>
                <option value="Chinese">Chinese</option>
                <option value="Snacks">Snacks</option>
              </select>
            <textarea 
            className=" block border-b outline-0 p-3 w-[100%] "
            {...register("description")}
             placeholder="Enter Description of the Recipe" />

          <textarea 
            className=" block border-b outline-0 p-3 w-[100%] "
            {...register("ingredients")}
             placeholder="Enter Ingredients of the Recipe" />

          <textarea 
            className=" block border-b outline-0 p-3 w-[100%] "
            {...register("instructions")}
             placeholder="Enter instructions for the Recipe" />

             <button className="px-4 py-2 mt-3 block bg-blue-900 rounded-xl">Update Recipe</button>
             <button onClick={deleteHandler} className="px-4 py-2 mt-2 block bg-red-900 rounded-xl">Delete Recipe</button>
      </form>
    </div>)
}

export default SingleRecipe