import React from 'react';
import { FaCopyright } from 'react-icons/fa';

function Footer(props) {
    return (
        <div className='px-4'>
             <div className='shadow-lg mb-5 p-4 bg-white rounded-md mx-auto flex justify-end gap-2'>
            <span>Copyrigt</span>             
            <FaCopyright className='flex justify-center item-center my-auto'/>
            <span className='font-bold text-blue-900'>Enjoy Nepal</span>             
            
        </div>
        </div>
       
    );
}

export default Footer;