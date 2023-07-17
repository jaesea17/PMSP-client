import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../styles/forms.css';
import { baseUrl } from "../../utils/baseUrl";
import LogoArea from "../../components/reusables/LogoArea";


function CreateStation() {
    const [successMsg, setSuccessMsg] = useState('');
    const token = localStorage.getItem('admin-token')
    const [registerError, setRegisterError] = useState("");

    const [inputs, setInputs] = useState({
        name: "",
        commodity: "",
        price: "",
        // availability: ""
    });


    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const { name, commodity, price } = inputs;
    const handleSubmit = (e: any) => {
        e.preventDefault();
        const payload = { name }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        axios.post(`${baseUrl}api/admin/station/create`, payload, config)
            .then((res) => {
                console.log('the resss', res)
                if (res.status === 201) {
                    //navigate(`${baseUrl}login`)
                    console.log("SUCCESSFUL")
                    const stationId = res.data?.record?.id;
                    axios.post(`${baseUrl}api/admin/petrol/create`, {
                        stationId, commodity, price,
                    }, config)
                        .then((result) => {
                            if (result.status === 201) {
                                setSuccessMsg("Station and commodity created successfully")
                                setInputs({
                                    name: "",
                                    commodity: "",
                                    price: "",
                                    // availability: ""
                                })
                            }
                        })
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
                <h3> ENTER STATION DETAILS</h3>
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>
                            Name:
                            <input
                                type="text"
                                name="name"
                                value={inputs.name || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Commodity:
                            <input
                                type="text"
                                name="commodity"
                                value={inputs.commodity || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Price:
                            <input
                                type="number"
                                name="price"
                                value={inputs.price || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        {/* <label>
                            Availability:
                            <input
                                type="text"
                                name="availability"
                                value={inputs.availability || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br /> */}
                        <input className="submt-btn" type="submit" value="CREATE" />
                    </form>
                    <p style={{
                        "color": "green"
                    }}>{successMsg}</p>
                    <p style={{
                        "color": "red"
                    }}>{registerError}</p>
                </div>
            </div>
        </>
    )

}
export default CreateStation