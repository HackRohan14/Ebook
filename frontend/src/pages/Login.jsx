import React from 'react'
import {Link} from "react-router-dom"
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Login() {
  const[Values,setValues]=useState({
    username:"",
    password:"",
  });
  const navigate=useNavigate();
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value});
  }
  const submit= async(e)=>{
    e.preventDefault();
    try {
      if(Values.username===""||  Values.password==="" ){
        alert("Please fill all the fields");
      }
      else{
        const res=await axios.post("http://localhost:4000/api/v1/sign-in",Values);
        console.log(res.data);
        
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-zinc-900 h-[80vh] flex justify-center items-center'>
          <form className='flex flex-col gap-2 bg-zinc-700 p-8 text-white w-[40vw] rounded' >
              <p className='text-zinc-200 text-xl'>Login</p>
              <hr />
              <label htmlFor="username">Username</label>
              <input type="text" name='username' className='w-[25vw] md:w-[auto] bg-zinc-800' value={Values.username} onChange={change}/>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' className='w-[25vw] md:w-[auto] bg-zinc-800' value={Values.password} onChange={change}/>
              <button className='bg-blue-500 w-[30vw] md:w-auto mt-4 rounded' onClick={submit}>Login</button>
              <p className='flex align-center justify-center'>Or</p>
              <p className='text-sm pt-2 flex justify-center text-white' >Dont't Have An Account? <Link to="/SignUp" className='text-blue-700'>SignUp</Link></p>
          </form>
      </div>
  )
}

export default Login;
