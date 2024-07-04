import react from "react";



const Navbar=()=>{

    const links =[
        {
            title:"Home",
            link:"/"
        },
        {
            title:"About us",
            link:"/about-us"
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
            link:"/profile"
        },
    ];
    return (
    <div className="bg-zinc-800 text-white px-8 py-4 flex item-center justify-between">
            <div className="flex">
                <div className="text-2xl font-semibold">BookHeaven</div>
            </div>
            <div className="nav-links-bookheaven flex gap-4">
                {
                    links.map((items,i)=>(
                    <div key={i}>{items.title}</div>
                ))}
                <div className="flex gap-4">
                    <button className="border px-4 border-white-500 hover:bg-zinc-700 transition:all duration-300 rounded">Login</button>
                    <button className="border px-4 border-white-500 bg-blue-500 rounded hover:bg-zinc-600 transition:all duration-300">Sign Up</button>
                </div>
            </div>
            
    </div>
    )
};


export default Navbar;