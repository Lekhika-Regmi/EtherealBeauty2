import { Outlet } from 'react-router-dom';
//import './Customer.css'
import '../App.css'
import '../index.css'

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { NotificationProvider } from './components/NotificationProvider'; // Import the NotificationProvider



function Customer() {

  return (
    <NotificationProvider> {/* Wrap everything inside NotificationProvider */}
      <Navbar />
      <Outlet />
      <Footer />
    </NotificationProvider>
  );
}

export default Customer
