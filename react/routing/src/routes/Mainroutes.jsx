import { Routes,Route } from 'react-router-dom'
import Home from "../components/Home"
import Service from "../components/Service"
import About from "../components/About"
import Productdetails from '../components/Productdetails'
import Servicedetails from '../components/Servicedetails'


const Mainroutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/about/details/:name' element={<Productdetails/>} />
        <Route path='/service' element={<Service/>} >
            <Route path='/service/details' element={<Servicedetails/>} />
        </Route>
      </Routes>
  )
}

export default Mainroutes
