import React from 'react'
import {Link} from "react-router-dom"
import { IoIosLogOut } from "react-icons/io";

function Sidebar({data}) {
  return (
    
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
        <div className='flex items-center flex-col justify-center'>
                <img src="../src/assets/avatar.png" alt="/" className='h-12vh'/>
            <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                {data.username}
            </p>
            <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
            <div className='w-full flex-col items-center justify-center hidden lg:flex'></div>
        </div>
        <div className='flex flex-col gap-3 pb-8'>
        <Link to="/Profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Favorites
        </Link>
        <Link to="/Profile/orderHistory" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
        Order History
        </Link>
        <Link to="/Profile/settings" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Settings
        </Link>
        </div>
        <button className='bg-zinc-700 w-3/6 lg:w-full h-8 mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center rounded gap-2'>
            Logout
            <IoIosLogOut />
        </button>
      </div>
    
  )
}

export default Sidebar
