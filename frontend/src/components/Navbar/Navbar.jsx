import react, { useState } from "react";
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
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
    ];

    const[mobileNav,setMobileNav]=useState("hidden");
    return (
        <>
    <nav className=" z-50 relative bg-zinc-800 text-white px-8 py-4 flex item-center justify-between">
            <div className="flex">
                <div className="text-2xl font-semibold">BookHeaven</div>
            </div>
            <div className="flex gap-4">
                <div className=" hidden md:flex nav-links-bookheaven gap-4">
                    {
                        links.map((items,i)=>(
                        <Link  to={items.link} key={i} >{items.title}</Link>
                    ))}
                    <div className=" md:flex gap-4">
                        <Link to="/Login" className="border px-4 border-white-500 hover:bg-zinc-700 transition:all duration-300 rounded">Login</Link>
                        <Link to="/SignUp" className="border px-4 border-white-500 bg-blue-500 rounded hover:bg-zinc-600 transition:all duration-300">Sign Up</Link>
                    </div>
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
                    <Link to="/SignUp" className="border mb-8 text-4xl font-semibold px-8 py-2 border-white-500 bg-blue-500 rounded hover:bg-zinc-600 transition:all duration-300">Sign Up</Link>
                    <Link to="/Login" className="border mb-8 text-4xl font-semibold px-8 py-2 border-white-500 hover:bg-zinc-600 text-white transition:all duration-300 rounded">Login</Link>
                   
    </div>
    </>
    )
};


export default Navbar;