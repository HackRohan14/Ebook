import React, { useEffect, useState } from 'react'
import axios from "axios";
import Loader from "../components/loader/Loader";
import { FaUserLarge } from "react-icons/fa6";
import { IoMdCheckmark } from "react-icons/io";
import { FiUserCheck } from "react-icons/fi";
import {Link} from "react-router-dom";
import SeeUserData from './SeeUserData';

const Allorders = () => {
  const[Allorders,setallorders]=useState();
  const [Options,setoptions]=useState(-1);
  const [Values,setValues] = useState({status:""});
  const [userDiv,setuserDiv]=useState("hidden");
  const [userDivdata,setuserDivdata]=useState();
  const headers={
      id:localStorage.getItem("id"),
      authorization:`Bearer ${localStorage.getItem("token")}`
  }
  useEffect(()=>{
      const fetch = async()=>{
        const response=await axios.get("http://localhost:4000/api/v1/get-all-order",{headers});
          setallorders(response.data.data);
      }
      fetch();
  },[Allorders]);

  const change=(e)=>{
    const {value}=e.target;
    setValues({status:value});
  };

  const submitChanges=async(i)=>{
    const id = Allorders[i]._id;
    const response =await axios.put(`http://localhost:4000/api/v1/update-status/${id}`,Values,{headers});
    alert((response).data.message);
  }
  return (
    <>
      {!Allorders && <div className='h-[100%] flex items-center justify-center'><Loader /></div>}
      {Allorders && Allorders.length>0 && (
        <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            All Orders
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
                 <h1 className=''>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1 className=''>
                <FaUserLarge />
              </h1>
            </div>
          </div>
          {Allorders.map((items,i)=>(
            <div className='bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer'>
              <div className='w-[3%]'>
                <h1 className='text-center'>{i+1}</h1>
              </div>
              <div className='w-[40%] md:w-[22%]'>
                <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
                    {items.book.title}
                </Link>
              </div>
              <div className='w-0 md:w-[45%] hidden md:block'>
                  <h1 className=''>{items.book.desc.slice(0,50)}...</h1>
              </div>
              <div className='w-[1%] md:w-[9%]'>
                <h1 className=''>{items.book.price}</h1>
              </div>
              <div className='w-[30%] md:w-[16%]'>
                <h1 className='font-semibold'>
                  <button className='hover:scale-105 transition-all duration-300' onClick={()=>setoptions(i)}>
                    {items.status==="order placed"?(
                      <div className='text-yellow-500'>{items.status}</div>
                    ):items.status==="cancelled"?(
                      <div className='text-red-500'>{items.status}</div>
                    ):(
                      <div className='text-green-500'>{items.status}</div>
                    )}
                  </button>
                  <div className={`${ Options===i ? "block" :"hidden"} flex mt-4`}>
                    <select name="status" id="" className='bg-gray-800' onChange={change} value={Values.status}>
                      {["order placed",
                        "out for delivery",
                        "delivered",
                        "cancelled",
                      ].map((items,i)=>(
                          <option value={items} className=''>{items}</option>
                      ))}
                    </select>
                    <button className='text-green-500 hover:text-pink-600 mx-2' onClick={()=>{
                      setoptions(-1);
                      submitChanges(i);
                    }}>
                    <IoMdCheckmark />
                    </button>
                  </div>
                </h1>
              </div>
              <div className='w-[10%] md:w-[5%]'>
                <button className='text-xl hover:text-orange-500'
                onClick={()=>{
                  setuserDiv("fixed");
                  setuserDivdata(items.user);
                }}>
                    <FiUserCheck />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivdata && (
        <SeeUserData userDivdata={userDivdata}
        userDiv={userDiv}
        setuserDiv={setuserDiv} />
      )}
    </>
  );
};

export default Allorders
