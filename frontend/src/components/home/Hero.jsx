import React from 'react'

const Hero = () => {
  return (
    <div className='h-[75vh] flex'>
        <div className='w-full lg:w-3/6 flex flex-col items-start justify-center'>
            <h1 className="text-4xl lg:text-6xl font-semibold text-yellow-100 text-center lg:text-left">Discover Your Great Read</h1>
            <p className='mt-4 text-2xl lg:text-4xl text-zin-300'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
            <div className='mt-8'>
              <button className='text-xl lg:text-2xl text-yellow-100 font-semibold border rounded border-yellow-100 px-10 py-3 hover:bg-zinc-800'>Discover Book</button>
            </div>
        </div>
        <div className='w-full lg:w-3/6'></div>
    </div>
  )
};

export default Hero;
