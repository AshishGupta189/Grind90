import Create  from './Create';
import Read from './Read'
const App = () => {
  return (
    <div className='w-screen h-screen bg-zinc-700 flex p-10 text-white  '>
       <Create/>
      <hr />
      <Read />
    </div>
  )
}

export default App
