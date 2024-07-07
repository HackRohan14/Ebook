import React from 'react'
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className='h-[80vh] flex'>
        <div className='w-full lg:w-3/6 flex flex-col items-center lg:items-start  justify-center'>
            <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">Discover Your Great Read</h1>
            <p className='mt-4 text-xl text-center lg:text-left text-zin-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className='mt-8'>
              <Link to="/all-books" className='text-xl lg:text-2xl text-yellow-100 font-semibold border rounded border-yellow-100 px-10 py-3 hover:bg-zinc-800'>Discover Book</Link>
            </div>
        </div>
        <div className='w-full lg:w-3/6 h-auto lg:h-[100%] flex items-center justify-center'>
            <img src="../src/assets/Booook.png" alt="Hero" />
        </div>
    </div>
  )
};

export default Hero;
