import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom';

function Sidebar() {
    return (
        <div className='sidebar'>
            <div className='sidebar-items'><NavLink to="">Product Details</NavLink></div>
            <div className='sidebar-items'><NavLink to="compareProducts">Compare Products</NavLink></div>
        </div>
    )
}

export default Sidebar;