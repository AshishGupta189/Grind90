import AppRoutes from './routes/AppRoutes.jsx'
import SideBar from './component/SideBar.jsx'

const App = () => {
  return (
    <div className='flex w-screen h-screen gap-[1%] bg-[#02111B] text-white'> 
      <SideBar />
      <AppRoutes />
    </div>
  )
}

export default App
