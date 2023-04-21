import React from 'react';

function Dinalog({heading,handleAccept,handleOff}) {
    return (
        <div className='fixed inset-0 flex items-center justify-center bg-slate-800/50 z-[60]'>
            <div className='bg-white rounded-md w-[360px] h-[150px] py-4 px-8 flex flex-col justify-center items-center gap-4'>
                <div className='text-blue-500'>{heading}</div>
                <div className='flex flex-row-reverse gap-4 items-center'>
                    <button className='hover:scale-105 active:scale-90 duration-150 bg-red-500 text-white shadow-md shadow-red-500/70 py-1 px-2 rounded-md' onClick={handleAccept}>Accept</button>
                    <button className='hover:scale-105 active:scale-90 duration-150 shadow-md shadow-blue-950/20 text-blue-950 py-1 px-2 rounded-md' onClick={handleOff}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Dinalog;