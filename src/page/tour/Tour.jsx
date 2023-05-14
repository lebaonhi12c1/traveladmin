import React, { useCallback, useState } from 'react';
import Footer from '../../components/Footer';
import {BiSearchAlt} from "react-icons/bi"
import DataGridDemo from '../../components/Table';
import { Link } from 'react-router-dom';
import Dinalog from '../../components/Dinalog';
import { useCloseNofication, useFetchDelete } from '../../hooks';
import Loading from '../../components/Loading';
import Notification from '../../components/Notification';
function Tour(props) {
    const [status,setStatus] = useState({
        isLoading: false,
        success: false,
        message: '',
        isNotification: false
    })
    const [idDelete,setIdDelete] = useState(null)
    const [isdinalog,setIsdinalog] = useState(false)
    const handleDinalog =useCallback(value=>{
        setIsdinalog(!isdinalog)
        setIdDelete(value)
    },[isdinalog])
    const handleDelete = useCallback(async()=>{
        setIsdinalog(false)
        await useFetchDelete(`${import.meta.env.VITE_APP_SERVER_URL}/api/tour/${idDelete}`,setStatus)
        
    },[idDelete])
    useCloseNofication(status.isNotification,setStatus)
    return (
        <div className='center-element'>
            {/* Header */}
            <div className="w-[98%] shadow-lg mt-[80px] mb-5 p-4 bg-white rounded-md mx-auto flex justify-between">
                <div className="text-[24px] my-auto text-blue-900 font-[600] tracking-[0.75px]">Tour</div>
                <Link to={'/tours/add'} className='px-4 py-2 bg-[#0F09A1] select-none rounded-md shadow-md hover:scale-105 active:scale-90 cursor-pointer duration-150 text-white' >Add new tour</Link>
            </div>
            {/* End Header */}
            <div className='bg-white rounded-md w-[98%] shadow-lg mb-5 p-4 mx-auto'>
                {/* Content header */}
                <div className=" flex justify-between border-b-[1px] pb-3 mb-4 border-b-gray-300">
                    <div className='flex'>
                        <input type="text" className=' border-b-[1px] w-[350px] pr-2 text-[15.75px] my-auto' placeholder='Input your titile...'/>
                        <BiSearchAlt className='text-[26px] border-b-[1px] active:scale-95 hover:scale-110 select-none duration-150 cursor-pointer my-auto'/>
                    </div>
                    <div className='flex'>
                        <div className='my-auto'>Sort by:</div>
                        <select className='cursor-pointer px-3 py-2 rounded-md border-[1px] border-slate-200 ml-2'  name="" id="">
                            <option value="" className='cursor-pointer'>Choose type of sort</option>
                        </select>
                    </div>
                </div>
                {/* End Content header */}
                <div className='shadow-md'>
                    <DataGridDemo type={'tour'} handler={handleDinalog}/>
                </div>
            </div>
            {/* Footer */}
            <Footer/>
            {/* End Footer */}
            {status.isLoading && (
                 <div className="flex items-center justify-center fixed inset-0 bg-slate-950/50 z-[60]">
                    <Loading heading="Deleting... " />
                </div>
            )}
            {isdinalog && <Dinalog heading = 'Are you sure ? ' handleOff={handleDinalog} handleAccept={handleDelete}/>}

            {status.isNotification && (
                status.success ? (<Notification heading={status.message} type={'success'}/>):(<Notification heading={status.message} type={'fail'}/>)
            )}
        </div>
    );
}

export default Tour;