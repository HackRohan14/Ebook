import React from 'react'
import {Link} from "react-router-dom";
function BookCard({data}) {
  console.log(data);
  return (
    <>
        <Link to={`/view-book-details/${data._id}`}>
          <div className="book-card bg-zinc-800 rounded p-4 flex flex-col w-60">
            <div className='bg-zinc-900 rounded flex items-center justify-center'>
              <img src={data.image} alt="/" className='h-[25vh]'/>
            </div>
            <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
          </div>
        </Link>
    </>
  )
}

export default BookCard
