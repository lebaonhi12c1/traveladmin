import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineHome,AiFillContacts } from "react-icons/ai";
import {GiDetour} from 'react-icons/gi'
import {FaMicroblog} from 'react-icons/fa'
import {TfiLocationArrow} from 'react-icons/tfi'
import {BiBookContent} from 'react-icons/bi'
function Sidebar(props) {
  const {pathname} = useLocation()
  const handleActive = type =>{
    return pathname.includes(type)  ? true: false
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 text-white bg-blue-950 border-r w-[250px] border-slate-500 flex flex-col gap-4 overflow-y-auto shadow-lg shadow-slate-400 z-50">
      <Link to={"/"} className="text-center p-4 border-b border-slate-600 grid grid-cols-3 select-none cursor-pointer">
        <div className="col-span-1 rounded-full overflow-hidden">
          <img src="/images/logo.jpg" alt="Logo company" />
        </div>
        <div className="col-span-2 flex justify-center items-center text-[22.75px] font-[500] text-white"> Enjoy Nepal</div>
      </Link>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 px-2 ">
          <AiOutlineHome />
          <Link className={`w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${pathname === '/' ? 'bg-blue-300 text-blue-950':'text-white '}`} to={"/"}>
            Dashboard
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="italic">Manage</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 pl-2 ">
              <TfiLocationArrow />
              <Link className={`w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/destinations') ? 'bg-blue-300 text-blue-950':'text-white '}`} to={"/destinations"}>
                Destinations
              </Link>
            </div>
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 pl-2 ">
              <GiDetour />
              <Link className={`w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/tours') ? 'bg-blue-300 text-blue-950':'text-white '}`} to={"/tours"}>
                Tours
              </Link>
            </div>
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 pl-2 ">
              <FaMicroblog />
              <Link className={`w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/blogs') ? 'bg-blue-300 text-blue-950':'text-white '}`} to={"/blogs"}>
                Blogs
              </Link>
            </div>
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 pl-2 ">
              <AiFillContacts />
              <Link className={`w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/contact') ? 'bg-blue-300 text-blue-950':'text-white '}`} to={"/contact"}>
                Contact
              </Link>
            </div>
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 pl-2 ">
              <BiBookContent />
              <Link className={`w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/about') ? 'bg-blue-300 text-blue-950':'text-white '}`} to={"/about"}>
                About
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
