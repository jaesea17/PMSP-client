import React from "react";
import { Link } from 'react-router-dom'

export default function Create() {


    return (
        <div className="create-div">
            <Link to="/create-product"><button className="create-btn">Add product</button></Link>
        </div>
    )
}
