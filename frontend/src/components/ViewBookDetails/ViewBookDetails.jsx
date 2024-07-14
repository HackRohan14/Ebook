import React,{useEffect , useState} from 'react'
import { useParams } from 'react-router-dom';
import axios from "axios";
import Loader from "../loader/Loader";
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { CiShoppingCart } from "react-icons/ci";
import { useSelector } from 'react-redux';


function ViewBookDetails() {
    const {id}=useParams();
    console.log(id);
    const [Data,setData]=useState({});
    const isloggedin=useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    
    useEffect(()=>{
        const fetch = async()=>{
            const response = await axios.get(`http://localhost:4000/api/v1/get-book-by-id/${id}`);
            //console.log(response.data.book);
            setData(response.data.book);
        }
        fetch();
    },[]);
    //console.log(localStorage.getItem("id"));
    const handleFavorites = async()=>{
        try {
            const response = await axios.put('http://localhost:4000/api/v1/addbook-to-favorites', {}, {
                headers: {
                    id:localStorage.getItem("id"),
                    bookid:id,
                    authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (response.status === 200) {
                alert("Book is added to favorites");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 400) {
                    alert("Book is already in favorites");
                } else {
                    alert("Internal Server Error");
                }
            } else {
                alert("Network Error");
            }
        }
    };

    //Handle Cart
    const handleCart=async()=>{
        try{
            const res= await axios.put("http://localhost:4000/api/v1/add-to-cart",{},{
                headers: {
                    id:localStorage.getItem("id"),
                    bookid:id,
                    authorization:`Bearer ${localStorage.getItem("token")}`
                }
            });
            if (res.status === 200) {
                alert("Book is added to Cart");
            }
        }
        catch (error) {
            if (error.response.status===400) {
                    alert("Book is already in Cart");
                
            } 
            else {
                alert("Network Error");
            }
        }
    }
  return (
    <div className=' px-4 md:px-12 py-8 bg-zinc-900 flex gap-2 flex-col md:flex-row'>
        <div className='bg-zinc-800 rounded p-4 h-[70vh] lg:h-[80vh] sm:w-5/6  w-full lg:w-3/6 flex items-center justify-around gap-1'>
            <img src={Data.image} alt="/" className='h-[50vh] lg:h-[70vh]'/>
            <div className='flex flex-col md:h-[50vh] lg:h-[70vh] sm:justify-start sm:items-start'>
                {isloggedin && role &&
                <>
                    <button className='bg-white rounded-full text-3xl  p-2 text-red-700 ' onClick={handleFavorites}><FaHeart /></button>
                    <button className='bg-white rounded-full text-3xl p-2 mt-4 text-blue-400' onClick={handleCart}><CiShoppingCart /></button>
                </>
                }
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
