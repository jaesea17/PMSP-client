import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from "../utils/baseUrl";
import LogoArea from "../components/reusables/LogoArea";


function Register() {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        fullname: "", email: "", gender: "", address: "", phone: "", password: "", confirm_password: ""
    });
    const [registerError, setRegisterError] = useState("");

    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const { fullname, email, gender, address, phone, password, confirm_password } = inputs;
        const payload = {
            "fullname": fullname, "email": email,
            "gender": gender, "address": address,
            "phone": phone, "password": password,
            "confirm_password": confirm_password
        }
        axios.post(`${baseUrl}api/user/create`, payload)
            .then((res) => {
                console.log('the resss', res)
                if (res.status === 200) {
                    navigate(`${baseUrl}login`)
                }
            }).catch((err) => {
                const theError = err['response']['data']['Error']
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
                            Fullname
                            <input
                                type="text"
                                name="fullname"
                                value={inputs.fullname || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Email
                            <input
                                type="email"
                                name="email"
                                value={inputs.email || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Gender
                            <input
                                type="text"
                                name="gender"
                                value={inputs.gender || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Address
                            <input
                                type="text"
                                name="address"
                                value={inputs.address || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Phone
                            <input
                                type="text"
                                name="phone"
                                value={inputs.phone || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Password
                            <input
                                type="password"
                                name="password"
                                value={inputs.password || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Confirm password
                            <input
                                type="password"
                                name="confirm_password"
                                value={inputs.confirm_password || ""}
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