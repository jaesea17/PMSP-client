import React from "react";
import { useNavigate } from "react-router-dom";

function SignOut() {

    const navigate = useNavigate();

    const remvTokenAndRedirect = () => {
        localStorage.removeItem("token");
        navigate('/login')
    }


    return (
        <div className="signout-div">
            <button onClick={remvTokenAndRedirect} className="signout-btn" >Signout</button>
        </div>
    )
}
export default SignOut
