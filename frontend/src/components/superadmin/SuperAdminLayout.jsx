import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './SuperadminNavbar';
import DashboardSideBar from '../../pages/superadmin/DashboardSideBar';

const SuperAdminLayout = (props) => {
    const location = useLocation();



    // Define active state based on the current URL
    const getActiveTab = () => {
        if (location.pathname.includes('/superadmin/dashboard')) return 1;
        if (location.pathname.includes('/superadmin/orders')) return 2;
        if (location.pathname.includes('/superadmin/products')) return 3;
        if (location.pathname.includes('/superadmin/vendors/pending')) return 4;
        if (location.pathname.includes('/superadmin/customers')) return 5;
        if (location.pathname.includes('/dashboard-create-events')) return 6;
        if (location.pathname.includes('/superadmin/vendors/approved')) return 7;
        return 0;
    };


    return (
        <>
            <Navbar />
            <div className="flex">
                {/* Sidebar */}
                <DashboardSideBar active={getActiveTab()} />
                {/* Main content */}
                <div className="flex-1 p-4 bg-gray-100 min-h-screen">
                    <Outlet />
                    {/* {props.children} */}
                </div>
            </div>
        </>
    );
};

export default SuperAdminLayout;
