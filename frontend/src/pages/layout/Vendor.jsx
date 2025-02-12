import { useState } from 'react'
import { Outlet } from 'react-router-dom';

// import '../App.css'
import Navbar from '../../components/VendorNavbar';
import DashboardSideBar from '../../pages/layout/DashboardSideBar';

function Vendor() {

  return (
    <>
    <Navbar/>
    <div className="flex">
                {/* Sidebar */}
                <DashboardSideBar />
                {/* Main content */}
                <div className="flex-1">
                    <Outlet /> {/* This will render the CreateProduct component */}
                </div>
            </div>
    </>
  )
}

export default Vendor
