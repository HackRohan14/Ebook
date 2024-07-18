import React, { useState } from 'react';
import axios from 'axios';
function Addbook() {
    const[Data,setData]=useState({
        url:"",
        title:"",
        author:"",
        price:"",
        image:"",
        desc:"",
        language:"",
    });
    const headers={
        id:localStorage.getItem("id"),
        authorization:`Bearer ${localStorage.getItem("token")}`,
    }

    const change=(e)=>{
        const {name,value}= e.target;
        setData({...Data,[name]:value});
    };

    const submit= async()=>{
        try {
            if(
                Data.url==="" ||
                Data.title==="" ||
                Data.author==="" ||
                Data.price==="" ||
                Data.desc==="" ||
                Data.language===""    
            )
            {
                alert("All fields Are Required");
            }
            else{
                Data.image=Data.url;
                const response = await axios.post("http://localhost:4000/api/v1/addbook",Data,{headers});
                alert(response.data.message);
                setData({
                    url:"",
                    title:"",
                    author:"",
                    price:"",
                    desc:"",
                    language:"",
                });
            }
        }catch (error) {
            console.log(error);
        }
    }

  return (
    <div>
        <div className='h-[100%] p-0 md:p-4'>
            <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
                Add BOOK
            </h1>
            <div className='p-4 bg-zinc-800 rounded flex flex-col'>
                <div>
                    <label htmlFor="" className='text-zinc-400'>
                        Image
                    </label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='url of image' name='url' required value={Data.url} onChange={change} />
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>
                        Title of Book
                    </label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Title of Book' name='title' required value={Data.title} onChange={change}/>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>author of book</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Author of book' name='author' required value={Data.author} onChange={change}/>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Language</label>
                    <input type="text" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Language of Book' name='language' required value={Data.language} onChange={change}/>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Price</label>
                    <input type="number" className='w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none' placeholder='Price of Book' name='price' required value={Data.price} onChange={change}/>
                </div>
                <div className='mt-4'>
                    <label htmlFor="" className='text-zinc-400'>Description Of Book</label>
                    <textarea name="desc" id="" placeholder='Description of Book' required onChange={change} className='w-full mt-2 bg-zinc-900 text-zinc-100' rows={3} value={Data.desc}></textarea>
                </div>
                <div className='mt-4'>
                    <button onClick={submit} className='w-full mt-5 bg-zinc-900 text-zinc-100 p-2 outline-none'>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Addbook
