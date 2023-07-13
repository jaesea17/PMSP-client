import React from 'react'
import { Link } from 'react-router-dom'
// import '../styles/LogoArea.css'

export default function LogoArea() {
    return (
        <div className='logo-area'>
            <Link to="/" className='link'><h2 className='logo-area-text'>fuel market</h2></Link>
        </div>
    )
}
