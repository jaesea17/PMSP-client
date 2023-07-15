import React from 'react'
import { Link } from 'react-router-dom'
// import '../styles/navBar.css'


export default function Navbar() {
    return (
        <header>
            <nav className='nav-bar'>
                <ul>
                    {/* <li><Link to='/' className='link'>Home</Link></li> */}
                    <li><Link to='/login' className='link'>Login</Link></li>
                    <li><Link to='/register' className='link'>Register</Link></li>
                </ul>
            </nav>
        </header>
    )
}
