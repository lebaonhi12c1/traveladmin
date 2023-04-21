import React, { useEffect, useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar'
function DefaultLayout(props) {
   // console.log(JSON.parse(localStorage.getItem('user').access_token))
    const router = useNavigate()
    const getLogin = async()=>{
       try {
        const res = await fetch(`${import.meta.env.VITE_APP_SERVER_URL}/api/employee/auth`,{
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({access_token: JSON.parse(localStorage.getItem('user')).access_token})
        })
        if(res.status !== 200){
            router('/login')
        }
       } catch (error) {
        router('/login')
        // throw(error)
       }
    }
    useEffect(()=>{
        getLogin()
    },[])
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Sidebar/>
        </div>
    );
}

export default DefaultLayout;