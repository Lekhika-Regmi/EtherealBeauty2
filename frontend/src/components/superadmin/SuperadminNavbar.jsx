import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <header className='fixed-nav-bar w-nav'>

            <nav className='max-w-screen-2xl mx-auto px-4 flex justify-between items-center'>

                

                {/*  name of website */}
                <div className='nav__logo'>
                    <Link to="/"> Ethereal Beauty</Link>
                </div>

                <div className='nav__icons relative'>
                    <span>
                        <Link to="/search">
                        <i className="ri-notification-line text-xl"></i>                        </Link></span>
                    <span>
                        <Link to="/login">
                            <i class="ri-user-line"></i>
                        </Link>
                    </span>

                </div>



            </nav>
        </header>
    )
}

export default Navbar