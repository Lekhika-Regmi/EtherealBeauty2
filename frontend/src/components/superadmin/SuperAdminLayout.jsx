// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './SuperadminNavbar';
// import DashboardSideBar from '../../pages/superadmin/DashboardSideBar';

// const SuperAdminLayout = () => {
//   return (
//     <>
//       <Navbar />
//       <div className="flex">
//         {/* Sidebar */}
//         <DashboardSideBar />
//         {/* Main content */}
//         <div className="flex-1">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default SuperAdminLayout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './SuperadminNavbar';
import DashboardSideBar from '../../pages/superadmin/DashboardSideBar';

const SuperAdminLayout = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        <DashboardSideBar />
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
