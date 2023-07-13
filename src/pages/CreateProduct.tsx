import axios from "axios";
import React, { useEffect, useState } from "react";
import '../styles/forms.css';
import { baseUrl } from "../utils/baseUrl";
import LogoArea from "../components/reusables/LogoArea";


function CreateProduct() {
    const [successMsg, setSuccessMsg] = useState('');
    const token = localStorage.getItem('token')
    const [registerError, setRegisterError] = useState("");

    const [inputs, setInputs] = useState({
        name: "",
        image: "",
        brand: "",
        category: "",
        description: "",
        price: "",
        countInStock: "",
        rating: "",
        numReviews: ""
    });


    const handleChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const {
            name,
            image,
            brand,
            category,
            description,
            price,
            countInStock,
            rating,
            numReviews
        } = inputs;
        const payload = {
            "name": name,
            "image": image,
            "brand": brand,
            "category": category,
            "description": description,
            "price": price,
            "countInStock": countInStock,
            "rating": rating,
            "numReviews": numReviews
        }
        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        axios.post(`${baseUrl}api/product/create`, payload, config)
            .then((res) => {
                console.log('the resss', res)
                if (res.status === 200) {
                    //navigate(`${baseUrl}login`)
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
                <h3> ENTER PRODUCT DETAILS</h3>
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
                            Image:
                            <input
                                type="text"
                                name="image"
                                value={inputs.image || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Brand:
                            <input
                                type="text"
                                name="brand"
                                value={inputs.brand || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Category:
                            <input
                                type="text"
                                name="category"
                                value={inputs.category || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={inputs.description || ""}
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
                        <label>
                            Count In Stock:
                            <input
                                type="number"
                                name="countInStock"
                                value={inputs.countInStock || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Rating:
                            <input
                                type="number"
                                name="rating"
                                value={inputs.rating || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            No of review:
                            <input
                                type="number"
                                name="numReviews"
                                value={inputs.numReviews || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <input className="submt-btn" type="submit" value="Add" />
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
export default CreateProduct