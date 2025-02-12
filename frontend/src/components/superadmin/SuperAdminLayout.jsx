import React, { useState } from 'react';
// import { Outlet } from 'react-router-dom';


// import './App.css'
import Navbar from './SuperadminNavbar';
import DashboardSideBar from '../../pages/superadmin/DashboardSideBar';

const SuperAdminLayout = () => {

  return (
    <>
    <Navbar/>
    <div className="flex">
                {/* Sidebar */}
                <DashboardSideBar />
                {/* Main content */}
                <div className="flex-1">
                    {/* <Outlet /> This will render the CreateProduct component */}
                </div>
            </div>
    </>
  );
};

export default SuperAdminLayout;