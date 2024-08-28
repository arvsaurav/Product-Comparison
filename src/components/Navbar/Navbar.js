import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom';

function Navbar() {
    return (
        <div className='navbar'>
            <div className='navbar-items'>Product Comparison</div>
            <div className='navbar-items'><NavLink to="">Home</NavLink></div>
            <div className='navbar-items'><NavLink to="about">About</NavLink></div>
        </div>
    )
}

export default Navbar;