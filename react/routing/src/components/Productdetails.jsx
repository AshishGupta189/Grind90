import { useNavigate, useParams } from "react-router-dom"

const Productdetails = () => {
    const navigate = useNavigate();
    const params=useParams();
  return (
    <div>
        <h1>Product name</h1>
        <h1>Product details</h1>
        <button onClick={()=>{navigate('/about');}} className='bg-black text-white px-4 py-2 rounded'>Go back</button>
    </div>
  )
}

export default Productdetails
