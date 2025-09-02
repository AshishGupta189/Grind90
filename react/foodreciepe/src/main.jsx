import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import {ToastContainer} from "react-toastify"
import {BrowserRouter} from "react-router-dom"
import RecipeContext from './context/RecipeContext'

createRoot(document.getElementById('root')).render(
  <RecipeContext>
    <BrowserRouter>
      <App />
      <ToastContainer/>
    </BrowserRouter>
  </RecipeContext>
  )
