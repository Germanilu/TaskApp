import React from 'react';
import './Header.scss'
const Header = () => {
     return (
        <div className='headerDesign'>
            <div className="navbar">
                <a className='aLink' href="/">Home</a>
                <a className='aLink' href="/login">Login</a>
                <a className='aLink' href="/register">Register</a>
                
            </div>
            
        </div>
     )
}
export default Header;