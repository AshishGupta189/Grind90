import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <nav className="w-full h-12 bg-black/80 shadow-lg backdrop-blur-2xl text-white flex items-center justify-around">
        <Link to="/teachers">Teachers</Link>
        <Link to="/classes">Classes</Link>
        <Link to="/students">Students</Link>
      </nav>
  )
}

export default Nav
