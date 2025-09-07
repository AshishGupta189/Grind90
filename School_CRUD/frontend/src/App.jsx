import Nav from "./components/Nav"
import Mainroutes from "./routes/Mainroutes"
const App = () => {
  return (
    <div className="w-full min-h-screen bg-black overflow-auto">
      <Nav />
      <Mainroutes />
    </div>
  )
}

export default App
