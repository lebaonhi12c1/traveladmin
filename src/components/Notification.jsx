import React from 'react';
import { AiFillCheckCircle } from 'react-icons/ai';
function Notification({heading, type}) {
    return (
        <div className='fixed inset-0 flex flex-col items-center justify-center bg-slate-600/40 z-[60]'>
            <div className={`bg-white flex items-center gap-4 ${type === 'success' ?'text-green-500' : 'text-red-500'} rounded-md w-fit h-fit py-4 px-8`}>
                <AiFillCheckCircle/>
               <div> {heading}</div>
            </div>
        </div>
    );
}

export default Notification;