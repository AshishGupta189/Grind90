import React from 'react'
import { useNavigate,Outlet } from 'react-router-dom';

const Service = () => {
  const navigate= useNavigate()
  return (
    <div>
      <h1>Service</h1>
      <button onClick={()=>{navigate('/service/details');}} className='bg-black text-white px-4 py-2 rounded mb-5'>More details</button>

      <hr  />
      <Outlet/>
    </div>
  )
}

export default Service
