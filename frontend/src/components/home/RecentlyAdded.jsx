import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../loader/Loader';

function RecentlyAdded() {
    const[Data,setData]=useState();
    useEffect(() => {
        const fetch=async()=>{
            const response=await axios.get("http://localhost:4000/api/v1/get-recent-books");
            setData(response.data.books);
        };
        fetch();
    },[]);
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently Added Books</h4>
      <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
        {!Data && <div className='flex items-center justify-center my-8'><Loader/></div>}
        {Data && Data.map((items,i)=><div key={i}><BookCard data={items}/></div>)}
      </div>
    </div>
  )
}

export default RecentlyAdded;
