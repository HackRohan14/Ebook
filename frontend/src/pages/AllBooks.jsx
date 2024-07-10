import React from 'react'
import Loader from '../components/loader/Loader';
import BookCard from '../components/BookCard/BookCard';
import {useState,useEffect} from 'react';
import axios from 'axios';

function AllBooks() {
  const[Data,setData]=useState();
    useEffect(() => {
        const fetch=async()=>{
            const response=await axios.get("http://localhost:4000/api/v1/get-all-books");
            console.log(response.data);
            setData(response.data.books);
        };
        fetch();
    },[]);
  return (
    <div className='bg-zinc-900 px-12 h-auto py-8'>
        <h4 className='text-3xl text-yellow-100'>All Books</h4>
        {
          !Data && (<div className='flex items-center justify-center my-8'>
            <Loader/>{" "}
          </div>)
        }
          <div className='my-8 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
          {Data && Data.map((items,i)=><div key={i}><BookCard data={items}/></div>)}
          </div>

    </div>
  )
}

export default AllBooks;
