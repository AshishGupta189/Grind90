import { NavLink } from "react-router-dom"

const Nav = () => {
  return (
    <div className="flex gap-5">
        <NavLink to= "/">Home</NavLink>
        <NavLink to="/project">Project</NavLink>  
        <NavLink to="/agence">Agence</NavLink>
    </div>
  )
}

export default Nav
