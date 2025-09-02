import React from 'react'
import { useNavigate } from 'react-router-dom'


  const About = () => {
    const navigate= useNavigate();
  const navigatePage = (name)=>{
    navigate(`/about/details/${name}`)
  }
  return (
    <div >
      <h1 className='text-5xl font-thin mb-5'>Products</h1>
      <div className='mb-5'>
        <h1 className='text-3xl font-thin mb-3'>Product 1</h1>
        <button onClick={()=>navigatePage("Product 1")} className='bg-black text-white px-4 py-2 rounded'>See Details</button>
      </div>
      <div className='mb-5'>
        <h1 className='text-3xl font-thin mb-3'>Product 2</h1>
        <button onClick={()=>navigatePage("Product 2")} className='bg-black text-white px-4 py-2 rounded'>See Details</button>
      </div>
      <div className='mb-5'>
        <h1 className='text-3xl font-thin mb-3'>Product 3</h1>
        <button onClick={()=>navigatePage("Product 3")} className='bg-black text-white px-4 py-2 rounded'>See Details</button>
      </div>
    </div>
  )
}

export default About
