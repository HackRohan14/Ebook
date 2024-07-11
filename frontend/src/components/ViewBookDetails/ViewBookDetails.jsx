import React,{useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loader from "../loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";

function ViewBookDetails() {
    const {id}=useParams();
    const [Data,setData]=useState({});
    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get(`http://localhost:4000/api/v1/get-book-by-id/${id}`);
            console.log(response);
            setData(response.data.book);
        }
        fetch();
    },[]);
  return (
    <div className=' px-4 md:px-12 py-8 bg-zinc-900 flex gap-8 flex-col md:flex-row'>
        <div className='bg-zinc-800 rounded p-4 h-[70vh] lg:h-[88vh] w-full lg:w-3/6 flex items-center justify-around gap-8'>
            <img src={Data.image} alt="/" className='h-[50vh] lg:h-[70vh]'/>
            <div className='flex md:flex-col'>
                <button className='bg-white rounded-full text-3xl p-2'><FaHeart /></button>
                <button className='bg-white rounded-full text-3xl p-2 mt-4'><CiShoppingCart /></button>
            </div>
        </div>
        <div className='p-4 w-full lg:w-3/6'>
            <h1 className='text-3xl text-zinc-300 font-semibold'>{Data.title}</h1>
            <p className='text-zinc-400 mt-1'>{Data.author}</p>
            <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
            <p className='flex mt-4 items-center justify-start text-zinc-400'>
                <GrLanguage className='mr-2'/> 
                {Data.language}
            </p>
            <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
                Price :${Data.price}
            </p>
        </div>
      
    </div>
  )
}

export default ViewBookDetails;
