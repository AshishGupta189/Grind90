import React from 'react'
import { useNavigate } from 'react-router-dom';

const Servicedetails = () => {
    const navigate=useNavigate()
  return (
    <div>
        <h1>Service Details</h1>
      <button onClick={()=>{navigate(-1);}} className='bg-black text-white px-4 py-2 rounded'>Go Back</button>
    </div>
  )
}

export default Servicedetails
