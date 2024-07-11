import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

function SignUp() {
  const[Values,setValues]=useState({
    username:"",
    email:"",
    password:"",
    address:"",
  });
  const navigate=useNavigate();
  const change=(e)=>{
    const {name,value}=e.target;
    setValues({...Values,[name]:value});
  }
  const submit= async(e)=>{
    e.preventDefault();
    try {
      if(Values.username===""|| Values.email==="" || Values.password==="" || Values.password===""){
        alert("Please fill all the fields");
      }
      else{
        const res=await axios.post("http://localhost:4000/api/v1/sign-up",Values);
        alert(res.data.message);
        navigate("/Login");
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='bg-zinc-900 h-[80vh] flex justify-center items-center'>
          <form className='flex flex-col gap-2 bg-zinc-700 p-8 text-white w-[40vw] rounded' >
              <p className='text-zinc-200 text-xl'>Sign Up</p>
              <hr />
              <label htmlFor="username">Username</label>
              <input type="text" name='username' className='w-[25vw] md:w-[auto] bg-zinc-800' required value={Values.username} onChange={change}/>
              <label htmlFor="email">Email</label>
              <input type="email" name='email' className='w-[25vw] md:w-[auto] bg-zinc-800' required value={Values.email} onChange={change}/>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' className='w-[25vw] md:w-[auto] bg-zinc-800' required value={Values.password} onChange={change}/>
              <label htmlFor="address"  >Address</label>
              <textarea name="address" id="address" rows={3} cols={6} className='w-[25vw] md:w-[auto] bg-zinc-800' required value={Values.address} onChange={change}></textarea>
              <button className='bg-blue-500 w-[30vw] md:w-auto mt-4 rounded' onClick={submit}>Sign Up</button>
              <p className='text-sm pt-2 flex justify-center text-white' >Already Sign in? <Link to="/Login" className='text-blue-700'>Login</Link></p>
          </form>
      </div>
  )
}

export default SignUp;
