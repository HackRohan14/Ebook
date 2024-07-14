import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from "../loader/Loader";
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

const Settings = () => {
  const[value,setvalue]=useState({address:""});
  const[ProfileData,setProfileData]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  }
  const change =(e)=>{
    const {name,value}=e.target;
    setvalue({...value,[name]:value});
  };
  const submitaddress = async()=>{
    const response= await axios.put("http://localhost:4000/api/v1/update-address",value,{headers});
    alert(response.data.message);
  }

  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get("http://localhost:4000/api/v1/get-user-information",{headers});
      setProfileData(response.data);
      setvalue({address:response.data.address})
    };
    fetch();
  },[])
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white'>
      {!ProfileData && (
        <div className='w-full h-[100%] flex items-center justify-center'>
          <Loader/>
        </div>
      )}
      {ProfileData && (
          <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
              Settings
            </h1>
            <div className='flex gap-12'>
              <div className=''>
                <label htmlFor="">Username</label>
                <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                  {ProfileData.username}
                </p>
              </div>
              <div className=''>
                <label htmlFor="">Email</label>
                <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
                  {ProfileData.email}
                </p>
              </div>
            </div>
            <div className='mt-4 flex flex-col'>
              <label htmlFor="">Address</label>
              <textarea name="address" rows="5" value={value.data} placeholder={value.data} className='p-2 rounded bg-zinc-800 mt-2 font-semibold' onChange={change}></textarea>
            </div>
            <div className='mt-4 flex justify-end'>
              <button className='bg-yellow-500 text-zinc-900 font-semibold px-3 py-2 rounded hover:bg-yellow-400' onClick={submitaddress}>Update</button>
            </div>
          </div>
      )}
      
    </div>
  )
}

export default Settings
