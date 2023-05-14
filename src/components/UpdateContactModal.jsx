import React from 'react';

function UpdateContactModal({isopen, handleUpdate, handleOff,value,handleSetValueUpdate}) {
    return (
        isopen && <div className='fixed inset-0 flex items-center justify-center bg-slate-800/50 z-[60]'>
            <div className='bg-white rounded-md w-[360px] h-fit py-4 px-8 flex flex-col justify-center items-center gap-4'>
                <div className='text-blue-500 text-[20px]'>Update Contact</div>
                <div className='flex flex-col gap-2 self-start w-full'>
                    <div className="">Name: {value.name}</div> 
                    <div className="">Email: {value.email}</div> 
                    <div className="">Subject: {value.subject}</div> 
                    <div className="">Message: {value.message}</div> 
                   <div className='flex items-center gap-2 w-full'>
                        <label htmlFor="status">Status:</label>
                        <select name="status" id="status" className='p-1 border border-slate-300 rounded-sm w-full' defaultValue={value.status} onChange={e=>handleSetValueUpdate({...value,status: e.target.value})}>
                            <option value="noprocess" className="">NoProcess</option>
                            <option value="process" className="">Process</option>
                        </select>
                   </div>
                </div>
                <div className='flex flex-row-reverse gap-4 items-center'>
                    <button className='hover:scale-105 active:scale-90 duration-150 bg-red-500 text-white shadow-md shadow-red-500/70 py-1 px-2 rounded-md' onClick={handleUpdate}>Accept</button>
                    <button className='hover:scale-105 active:scale-90 duration-150 shadow-md shadow-blue-950/20 text-blue-950 py-1 px-2 rounded-md' onClick={handleOff}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default UpdateContactModal;