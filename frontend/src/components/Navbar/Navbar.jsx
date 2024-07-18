import react, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import {useSelector} from 'react-redux';
import { PiNotebookBold } from "react-icons/pi";

const Navbar=()=>{

    const links =[
        {
            title:"Home",
            link:"/"
        },
        {
            title:"all Books",
            link:"/all-books"
        },
        {
            title:"cart",
            link:"/cart"
        },
        {
            title:"profile",
            link:"/Profile"
        },
        {
            title:"adminProfile",
            link:"/Profile"
        }
    ];
    const isloggedin=useSelector((state)=>state.auth.isLoggedIn);
    const role=useSelector((state)=>state.auth.role);
    if(isloggedin===false){
        links.splice(2,2);//removes cart and profile from user 
    }
    if(isloggedin===true && role==="user"){
        links.splice(4,1);
    }
    if(isloggedin ==true && role==="admin"){
        links.splice(3,1);//removes profile from admin
    }
    const[mobileNav,setMobileNav]=useState("hidden");
    return (
        <>
    <nav className=" z-50 relative bg-zinc-800 text-white px-8 py-4 flex item-center justify-between">
            <div className="flex gap-2 items-center justify-center">
                <PiNotebookBold className="text-3xl text-blue-300"/>
                <div className="text-2xl font-semibold">BookHeaven</div>
            </div>
            <div className="flex gap-4">
                <div className=" hidden md:flex nav-links-bookheaven gap-4">
                    {
                        links.map((items,i)=>(
                        <Link  to={items.link} key={i} >{items.title}</Link>
                    ))}
                    {isloggedin===false && <div className=" md:flex gap-4">
                        <Link to="/Login" className="border px-4 border-white-500 hover:bg-zinc-700 transition:all duration-300 rounded">Login</Link>
                        <Link to="/SignUp" className="border px-4 border-white-500 bg-blue-500 rounded hover:bg-zinc-600 transition:all duration-300">Sign Up</Link>
                    </div>}
                </div>
                    <button className= "lg:hidden text-white text-2xl hover:text-zinc-400" onClick={()=>(mobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
                            <FaGripLines />
                    </button>
            </div>
    </nav>
    <div className={`${mobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full flex flex-col items-center justify-center`}>
    {links.map((items,i)=>(
        <Link  to={items.link} key={i} className="text-white text-4xl font-semibold mb-8 hover:text-blue-500 transition-all duration-300 " onClick={()=>(mobileNav==="hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
        {items.title}
        </Link>))}
                    {isloggedin==false &&<><Link to="/SignUp" className="border mb-8 text-4xl font-semibold px-8 py-2 border-white-500 bg-blue-500 rounded hover:bg-zinc-600 transition:all duration-300">Sign Up</Link>
                    <Link to="/Login" className="border mb-8 text-4xl font-semibold px-8 py-2 border-white-500 hover:bg-zinc-600 text-white transition:all duration-300 rounded">Login</Link></>}
                   
    </div>
    </>
    )
};


export default Navbar;