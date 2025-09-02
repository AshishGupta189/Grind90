import React, { useState } from 'react'
import Create  from './Create';
import Read from './Read'
const App = () => {
  const[todos,setTodos]=useState([
  ]);

  return (
    <div className='w-screen h-screen bg-zinc-700 flex p-10 text-white  '>
       <Create todos={todos} setTodos={setTodos}/>

      <hr />
      <Read todos={todos} setTodos={setTodos}/>
    </div>
  )
}

export default App
