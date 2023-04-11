import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import {GiDetour} from 'react-icons/gi'
import {FaMicroblog} from 'react-icons/fa'
import {TfiLocationArrow} from 'react-icons/tfi'
function Sidebar(props) {
  const {pathname} = useLocation()
  const handleActive = type =>{
    return pathname === type ? true: false
  }
  return (
    <div className="fixed top-0 left-0 bottom-0 text-white bg-blue-950 border-r w-[250px] border-slate-500 flex flex-col gap-4 overflow-y-auto">
      <div className="text-center p-4 border-b border-slate-600">logo</div>
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 px-2 ">
          <AiOutlineHome />
          <Link className={`text-white w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/') && 'bg-blue-300 text-blue-950'}`} to={"/"}>
            Dashboard
          </Link>
        </div>
        <div className="flex flex-col gap-2">
          <div className="italic">Manage</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 px-2 ">
              <TfiLocationArrow />
              <Link className={`text-white w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/destinations') && 'bg-blue-300 text-blue-950'}`} to={"/destinations"}>
                Destinations
              </Link>
            </div>
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 px-2 ">
              <GiDetour />
              <Link className={`text-white w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/tours') && 'bg-blue-300 text-blue-950'}`} to={"/tours"}>
                Tours
              </Link>
            </div>
            <div className="flex items-center gap-2  hover:text-blue-950 duration-150 hover:bg-blue-300 px-2 ">
              <FaMicroblog />
              <Link className={`text-white w-full py-1 px-2 hover:text-blue-950 hover:bg-blue-300 duration-150 ${handleActive('/blogs') && 'bg-blue-300 text-blue-950'}`} to={"/blogs"}>
                Blogs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
