import React from 'react'
import {Link, useNavigate} from "react-router-dom"
import { IoIosLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from '../../store/auth';

function Sidebar({data}) {
    const dispatch=useDispatch();
    const history=useNavigate();
    const role=useSelector((state)=> state.auth.role);
  return (
    <div className='bg-zinc-800 p-4 rounded flex flex-col items-center justify-between h-[100%]'>
        <div className='flex items-center flex-col justify-center'>
                <img src="../src/assets/avatar.png" alt="/" className='flex flex-col rounded-full'/>
            <p className='mt-3 text-xl text-zinc-100 font-semibold'>
                {data.username}
            </p>
            <p className='mt-1 text-normal text-zinc-300'>{data.email}</p>
            <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
            <div className='w-full flex-col items-center justify-center hidden lg:flex'></div>
        </div>
        {role==="user" && (<div className='flex flex-col gap-3 pb-8'>
        <Link to="/Profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Favorites
        </Link>
        <Link to="/Profile/orderHistory" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
        Order History
        </Link>
        <Link to="/Profile/settings" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Settings
        </Link>
        </div>)}
        {role==="admin" && (<div className='flex flex-col gap-3 pb-8'>
        <Link to="/Profile" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            All Order History
        </Link>
        <Link to="/Profile/add-book" className="text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
            Add Book
        </Link>
        </div>)}
        <button className='bg-zinc-700 w-3/6 lg:w-full h-8 mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center rounded gap-2' onClick={
            ()=>{
                dispatch(authActions.Logout());
                dispatch(authActions.changeRole("user"));
                localStorage.clear("id");
                localStorage.clear("token");
                localStorage.clear("role");
                history("/");
            }
        }>
            Logout
            <IoIosLogOut />
        </button>
      </div>
    
  )
}

export default Sidebar
