import React from 'react';
import {AiOutlinePoweroff} from 'react-icons/ai'
function Navbar(props) {
    const data = JSON.parse(localStorage.getItem("user")).name
    console.log(data)
    return (
        <div className='fixed  top-0 right-0 bg-white shadow-lg left-[250px] h-[60px] z-50'>
            <div className='flex items-center gap-2 justify-end h-full px-10'>
               <img src="https://img.freepik.com/free-photo/portrait-pretty-korean-girl-receive-surprising-news-looking-amazed-happy-camera-standing-blue-background_1258-76005.jpg?w=996&t=st=1681209515~exp=1681210115~hmac=d23be51da30d0c60529245ec94173434ae946d4e0a550ef2fc7a13549b3ec5ae" alt="" className='w-10 h-10 rounded-full'/>
               <div>{data}</div>
               <div className='border border-slate-400 h-[40%]'></div>
               <div><AiOutlinePoweroff className='text-[20px] text-red-600 cursor-pointer select-none' onClick={()=>{localStorage.removeItem("user");window.location.reload(true)}} title='Logout'/></div>
            </div>
        </div>
    );
}

export default Navbar;