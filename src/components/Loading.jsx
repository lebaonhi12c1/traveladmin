import React from 'react';
import {AiOutlineLoading3Quarters} from 'react-icons/ai'
function Loading({heading}) {
    return (
        <div className='flex items-center gap-4 w-fit h-fit py-4 px-8 bg-white shadow-lg shadow-slate-300 rounded-sm text-blue-950'>
            <AiOutlineLoading3Quarters className=' animate-spin'/>
            <div>{heading}</div>
        </div>
    );
}

export default Loading;