import React,{Fragment} from 'react'
import { nanoid } from 'nanoid'
import {useForm} from 'react-hook-form'
import { toast } from 'react-toastify'
const Create = (props) => {
    const todos=props.todos;
    const setTodos=props.setTodos;
    const{
      register,
      handleSubmit,
      reset,
      formState: {errors},
    }=useForm();
    const submitHandler=(e)=>{
        e.isCompleted=false;
        e.id=nanoid();
        setTodos([...todos,e]);    
        toast.success("todo created!")  
        reset();  
    }
  return (
    <div className=' w-[60%] p-10 '>
      <h1 className='text-5xl mb-10 text-thin'>Set <span className='text-red-400'>reminder</span> for tasks</h1>
      <form onSubmit={handleSubmit(submitHandler)}>
        <input
        {...register("title",{required:"title can't be empty"
        })}
        className='border-b text-2xl w-full p-2 outline-0'
         type="text" placeholder='Enter title' />
        <br />
        <small className='text-thin text-red-400'>{errors?.title?.message}</small>
        <br />
        <button className='text-xl px-10 py-2 border rounded'>Create todo</button>
      </form>
    </div>
  )
}

export default Create
