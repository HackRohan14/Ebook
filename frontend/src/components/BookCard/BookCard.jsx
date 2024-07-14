import React from 'react'
import {Link} from "react-router-dom";
import axios from "axios"

function BookCard({data,favorites}) {
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
    bookid:data._id
  }
  console.log(headers);
  const handeleRemoveBook = async()=>{
    const response = await axios.post(`http://localhost:4000/api/v1/removebook-from-favorites`,{},{headers});
    alert(response.data);
  }
  return (
    <div className="book-card bg-zinc-800 rounded p-4 flex flex-col w-60">
        <Link to={`/view-book-details/${data._id}`}>
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
              <img src={data.image} alt="/" className='h-[25vh]'/>
            </div>
            <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
            <p className='text-zinc-400 font-semibold mt-2'>{data.author}</p>
            <p className='text-zinc-200 font-semibold mt-2'>{data.price}</p>
        </Link>
        {
          favorites && (
            <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-500' onClick={handeleRemoveBook}>Remove from Favorite</button>
          )
        }
      </div>
  )
}

export default BookCard;
