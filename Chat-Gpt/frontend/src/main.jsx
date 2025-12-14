import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import { ChatProvider } from './context/ChatContext.jsx'
createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <ChatProvider>
        <App />
        <ToastContainer />
      </ChatProvider>
    </BrowserRouter>
)
