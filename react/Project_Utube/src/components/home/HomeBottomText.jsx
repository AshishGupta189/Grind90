import { Link } from "react-router-dom"

const HomeBottomText = () => {
  return (
    <div className="flex font-[font2] gap-3 items-center uppercase text-white justify-center ">
      <Link to={"/projects"} className="text-8xl border-4 rounded-full flex items-center pt-2 px-10 ">Projects</Link>
      <Link to={"/agence"} className="text-8xl border-4 rounded-full px-10 pt-2">Agence</Link>
    </div>
  )
}

export default HomeBottomText
