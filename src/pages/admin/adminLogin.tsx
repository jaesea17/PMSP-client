import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../../styles/forms.css'
import { baseUrl } from "../../utils/baseUrl";
import LogoArea from "../../components/reusables/LogoArea";


function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payload = {
            "userName": username,
            "password": password
        }

        axios.post(`${baseUrl}api/admin/login`, payload)
            .then((res) => {
                // console.log('the response:', res)
                if (res.status === 200) {
                    const token = res.data?.token;;

                    // localStorage.setItem('userId', userId)
                    localStorage.setItem('admin-token', token)
                    navigate('/')
                }
            }).catch((err) => {
                if (err) {
                    console.log('the err', err['response'])
                    const theError = err.response?.data?.message
                    setLoginError(theError);
                }

            })


    }

    return (
        <>
            <LogoArea />
            <div className="form-style">
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>
                            username
                            <input
                                type="text"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </label><br /><br />
                        <label>
                            password
                            <input
                                type="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label><br /><br />
                        <input className="submt-btn" type="submit" value="Login" />
                    </form><br />
                    {/* <p className="message">Not yet registered? <Link to="/register"><span> Click here to register</span></Link></p><br /> */}
                    <p style={{
                        "color": "red"
                    }}>{loginError}</p>
                </div>

            </div>
        </>

    )

}
export default AdminLogin
