import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from "../utils/baseUrl";
import LogoArea from "../components/reusables/LogoArea";


function Register() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        username: "", email: "", password: ""
    });
    const [registerError, setRegisterError] = useState("");

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { username, email, password } = inputs;
        const payload = {
            "userName": username, "email": email,
            "password": password,

        }
        axios.post(`${baseUrl}api/create`, payload)
            .then((res) => {
                console.log('the resss', res)
                if (res.status === 200) {
                    navigate('/login');
                }
            }).catch((err) => {
                const theError = err.response?.data?.Error;
                setRegisterError(theError);
            })
    }

    return (
        <>
            <LogoArea />
            <div className="form-style">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <label>
                            username
                            <input
                                type="text"
                                name="username"
                                value={inputs.username || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            email
                            <input
                                type="email"
                                name="email"
                                value={inputs.email || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            password
                            <input
                                type="password"
                                name="password"
                                value={inputs.password || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <input
                            className="submt-btn"
                            type="submit"
                            value="Register"
                        />
                    </form><br />
                    <p className="message">Already registered? <Link to="/login"><span> Click here to login</span></Link></p><br />
                    <p style={{
                        "color": "red"
                    }}>{registerError}</p>
                </div>

            </div>
        </>

    )

}
export default Register