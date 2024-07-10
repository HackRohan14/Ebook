import React from 'react'
import {Link} from "react-router-dom"

function Login() {
  return (
    <div className='bg-zinc-900 h-[80vh] flex justify-center items-center'>
          <form className='flex flex-col gap-2 bg-zinc-700 p-8 text-white w-[40vw] rounded' >
              <p className='text-zinc-200 text-xl'>Login</p>
              <hr />
              <label htmlFor="username">Username</label>
              <input type="text" name='username' className='w-[25vw] md:w-[auto] bg-zinc-800'/>
              <label htmlFor="password" bg-zinc-600>Password</label>
              <input type="password" name='password' className='w-[25vw] md:w-[auto] bg-zinc-800'/>
              <button className='bg-blue-500 w-[30vw] md:w-auto mt-4 rounded'>Login</button>
              <p className='flex align-center justify-center'>Or</p>
              <p className='text-sm pt-2 flex justify-center text-white' >Dont't Have An Account? <Link to="/SignUp" className='text-blue-700'>SignUp</Link></p>
          </form>
      </div>
  )
}

export default Login;
