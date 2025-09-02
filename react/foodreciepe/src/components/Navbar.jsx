import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex items-center justify-center gap-x-10 text-md mb-10'>
      <NavLink className={"px-5 py-2 rounded bg-[#3C3D37]"} to="/recipes">Recipes</NavLink> 
      <NavLink className={"px-5 py-2 rounded bg-[#3C3D37]"} to="/">Create-recipe</NavLink> 
      <NavLink className={"px-5 py-2 rounded bg-[#3C3D37]"} to="/fav">Favorites</NavLink> 
    </div>
  )
}

export default Navbar
