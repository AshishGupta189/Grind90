import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Agence from "../pages/Agence";
import Project from "../pages/Project";


const Mainroutes= ()=>(
    <Routes>
        <Route path="/" element={ <Home/> }/>
        <Route path="/agence" element={<Agence/>}/>
        <Route path="/project" element={<Project/>}/>
    </Routes>
)



export default Mainroutes;