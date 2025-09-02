import { useForm } from "react-hook-form"
import {nanoid} from 'nanoid'
import { useContext } from "react";
import { recipecontext } from "../context/RecipeContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Create = () => {

  const {data,setdata} = useContext(recipecontext)
  const navigate =useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState:{errors}
  }=useForm();
  const SubmitHandler= (recipe)=>{
    recipe.id=nanoid();
    const copydata=[...data];
    copydata.push(recipe)
    setdata(copydata);
    reset();
    toast.success("Recipe created!!!")
    localStorage.setItem("recipe" , JSON.stringify(copydata))
    navigate("/recipes")
  }
  return (
    <div  className="w-[65%] justify-center items-center m-auto flex  py-8 px-15 rounded bg-[#697565]">
        
          <div className="left w-1/2">
            <p>Cook. Create. Celebrate.</p>
            <h1 className="text-3xl text-[#1E201E] mt-2">Where Every Recipe <br /> Tells  a Story.</h1>
            <img className="w-[70%] mt-5 rounded h-[34vh] " src="https://imgs.search.brave.com/RkqZtnk-n1nSrV83f9m-LOE9Or6OlRYKWkKMUX18e7o/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzLzk0L2Jl/LzA0Lzk0YmUwNGNm/ZmRiYzQyNWEyNDlm/MWZiODU2N2NkOGU4/LmpwZw" alt="" />
          </div>
          <form className="w-1/2 p-5"  onSubmit={handleSubmit(SubmitHandler)}>
            <input 
            className=" block border-b outline-0 p-2 w-[80%] border-[#ECDFCC] "
            {...register("title",{required:"title can't be empty"})}
            type="text" placeholder="Recipe title" />
            <small className='text-thin text-red-400'>{errors?.title?.message}</small>
            <input 
            className=" block border-b outline-0 p-2 w-[80%] "
            {...register("image",{required:"Image url can't be empty"})}
            type="url" placeholder="Enter image url" />
            <small className='text-thin text-red-400'>{errors?.image?.message}</small>
            <select
              className=" block border-b outline-0 p-2  w-[80%] bg-[#697565]"
              {...register("category",{required:"category can't be empty"})}
              defaultValue=""
              >
                <option value="" disabled hidden>Select Category</option>
                <option value="breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Beverages">Beverages</option>
                <option value="Chinese">Chinese</option>
                <option value="Snacks">Snacks</option>
              </select>
              <small className='text-thin text-red-400'>{errors?.category?.message}</small>
            <textarea 
            className=" block border-b outline-0 p-3 w-[80%] "
            {...register("description",{required:"Decription can't be empty"})}
             placeholder="Enter Description of the Recipe" />
            <small className='text-thin text-red-400'>{errors?.description?.message}</small>
          <textarea 
            className=" block border-b outline-0 p-3 w-[80%] "
            {...register("ingredients",{required:"Ingredients can't be empty"})}
             placeholder="Enter Ingredients of the Recipe" />
            <small className='text-thin text-red-400'>{errors?.ingredients?.message}</small>
          <textarea 
            className=" block border-b outline-0 p-3 w-[80%] "
            {...register("instructions",{required:"Instructions can't be empty"})}
             placeholder="Enter instructions for the Recipe" />
            <small className='text-thin text-red-400'>{errors?.instructions?.message}</small>
             <button className="px-4 py-2 mt-5 block bg-gray-900 rounded-xl">Save Recipe</button>
          </form>

    </div>
  )
}

export default Create
