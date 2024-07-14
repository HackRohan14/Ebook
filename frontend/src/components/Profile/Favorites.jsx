import React, { useEffect, useState } from 'react'
import BookCard from "../BookCard/BookCard"
import axios from "axios"


function Favorites() {
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };
  const [favoriteBook,setFavoriteBook] = useState([]);
  //console.log(headers);
  useEffect(()=>{
    const fetch = async()=>{
      const response = await axios.get('http://localhost:4000/api/v1/get-favorite-book',{headers});
      //console.log(response.data.data.favorites);
      setFavoriteBook(response.data.data.favorites || []);
    }
    fetch();
  },[favoriteBook]);
  //console.log(favoriteBook);
  return (
    <>
    {favoriteBook && favoriteBook.length === 0 && (<div className='text-xl md:text-3xl lg:text-5xl font-semibold text-zinc-500 flex items-center justify-center'>No Favorite Book</div>)}
    <div className='grid grid-cols-4 gap-4 '>
      { 
        favoriteBook && favoriteBook.map((items,i)=>(
          <div key={i}>
          <BookCard data={items} favorites={true}/>
          </div>
        ))
      }
    </div>
    </>
  )
};

export default Favorites;
