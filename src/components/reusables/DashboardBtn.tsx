import React from 'react'
import { Link } from 'react-router-dom'

function DashboardBtn() {
    return (
        <div className='dashboard-btn'>
            <Link to="/dashboard">
                <button className='my-dashboard-btn'>My Dashboard</button>
            </Link>
        </div>
    )
}

export default DashboardBtn
