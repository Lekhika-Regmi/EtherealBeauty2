import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../auth/authSlice'; // Adjust the path as needed

const SuperadminNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get user state

    const handleLogout = () => {
        dispatch(logout()); // Clear authentication
        navigate('/'); // Redirect to home page
    };

    return (
        <header className="fixed-nav-bar w-nav">
            <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
                {/* Website Name */}
                <div className="nav__logo">
                    <Link to="/">Ethereal Beauty</Link>
                </div>

                {/* Navbar Icons */}
                <div className="nav__icons relative">
                    {/* User Dropdown */}
                    <span className="relative">
                        <button onClick={() => setDropdownOpen(!dropdownOpen)} className="focus:outline-none">
                            <i className="ri-user-line text-xl"></i>
                        </button>

                        {/* Dropdown Menu */}
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md">
                                <button 
                                    onClick={handleLogout} 
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </span>
                </div>
            </nav>
        </header>
    );
};

export default SuperadminNavbar;
