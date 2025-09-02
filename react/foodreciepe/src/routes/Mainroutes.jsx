import {Route,Routes} from "react-router-dom"
import Create from "../pages/create"
import Recipes from "../pages/Recipes"
import SingleRecipe from "../pages/SingleRecipe"
import PageNotFound from "../pages/PageNotFound"
import Fav from "../pages/Fav"

const Mainroutes = () => {
  return (
    <Routes>
       <Route path="/recipes" element={<Recipes/>}></Route>
       <Route path="/recipes/details/:id" element={<SingleRecipe/>}></Route>
       <Route path="/" element={<Create/>}></Route>
       <Route path="/fav" element={<Fav/>}></Route>
       <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
  )
}

export default Mainroutes
