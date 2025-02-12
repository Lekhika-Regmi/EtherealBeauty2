// src/layouts/SuperAdminLayout.jsx
import { useState } from 'react';
import Header from '../../pages/superadmin/Header';
import Sidebar from '../../pages/superadmin/Sidebar';
import Home from '../../pages/superadmin/Home';
import IconComponent from '../../pages/superadmin/IconComponent';
const SuperAdminLayout = ({ children }) => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className='grid-container'>
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home /> 
         </div>
  );
};

export default SuperAdminLayout;