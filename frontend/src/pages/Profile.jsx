import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Profile/Sidebar';
import { useSelector } from 'react-redux';
import axios from "axios";
import Loader from '../components/loader/Loader';
import Outlet from "../components/Profile/Outlet";

function Profile() {
  //const isloggedin=useSelector();
  const [profile,setProfile]=useState();
  const headers ={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
}
console.log(headers);
  useEffect(()=>{
      const fetch = async ()=>{
          const res=await axios.get("http://localhost:4000/api/v1/get-user-information",{headers});
          console.log(res);
          setProfile(res.data);
      }
      fetch();
  },[])
  return (
    <div className='bg-zinc-900 px-2 md:px-8 flex flex-col md:flex-row h-screen py-8 gap-4 text-white'>
        {
          !profile &&
          <div className='w-full h-[100%] flex items-center justify-center'>
            <Loader/>
          </div>
        }
        {
          profile && (<>
            <div className='w-1/6'><Sidebar data={profile}/></div>
                <div className='w-5/6'>
                    <Outlet data={profile}/>
                </div>
          </>)
        }
        
    </div>
  )
}

export default Profile;
