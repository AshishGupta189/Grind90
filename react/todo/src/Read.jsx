import React,{Fragment} from 'react'
import { toast } from 'react-toastify';

const Read = (props) => {
    const todos=props.todos;
    const setTodos=props.setTodos;
    const renderTodos= todos.map((todo)=>{
        return (
        <li key={todo.id}  
        className='p-3 rounded flex justify-between mb-2 items-center  bg-gray-900'>
            <span className='text-xl font-thin'>{todo.title}</span> 
             <button
             className='text-sm fot-thin text-red-400'
             onClick={()=> DeleteHandler(todo.id)}>Delete</button></li>
        );
    });

    const DeleteHandler=(id)=>{
        const ftodos=todos.filter((t)=> t.id !=id)
        setTodos(ftodos)
        toast.error("todo deleted!")
        
    }


  return (
    <div className='w-[40%] p-10'>
      <h1 className='text-5xl mb-10 text-thin'>Pending todos:</h1>
      <ol>{renderTodos}</ol>
    </div>
  )
}

export default Read
