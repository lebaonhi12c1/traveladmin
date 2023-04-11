import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
function DefaultLayout(props) {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            <Sidebar/>
        </div>
    );
}

export default DefaultLayout;