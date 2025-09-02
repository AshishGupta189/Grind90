import React, { createContext, useEffect, useState } from 'react'

export const recipecontext=createContext(null)

const RecipeContext = (props) => {

  const [data,setdata] =useState([]);
  const [favv, setfavv] = useState([]);
  useEffect(()=>{
      setdata(JSON.parse(localStorage.getItem("recipe")) || []);
      setfavv(JSON.parse(localStorage.getItem("fav")) || []);
  },[])

  const updateFav = (id) => {
    let newFav;
    if (favv.includes(id)) {
      newFav = favv.filter(f => f !== id);
    } else {
      newFav = [...favv, id];
    }
    setfavv(newFav);
    localStorage.setItem("fav", JSON.stringify(newFav));
  };
  return (
    <recipecontext.Provider value={{data,setdata,favv, updateFav}}>
        {props.children}
    </recipecontext.Provider>
  )
}

export default RecipeContext
