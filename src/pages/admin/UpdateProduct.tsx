import axios from "axios";
import React, { useEffect, useState } from "react";
import '../../styles/forms.css'
import { baseUrl } from "../../utils/baseUrl";
import LogoArea from "../../components/reusables/LogoArea";


function UpdateProduct() {
    const [productId, setProductId] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const token = localStorage.getItem('token');

    const [inputs, setInputs] = useState({
        name: "",
        image: "",
        brand: "", category: "",
        description: "",
        price: "",
        countInStock: "",
        rating: "",
        numReviews: ""
    });

    const getProductId = async () => {
        const productId = localStorage.getItem('productId') as string;
        setProductId(productId);
    }


    useEffect(() => {
        getProductId();
    }, [])

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


        //putting only input fields that where created into the payload
        const payload: Record<string, unknown> = {}
        if (name) payload['name'] = name
        if (image) payload['image'] = image
        if (brand) payload['brand'] = brand
        if (category) payload['category'] = category
        if (description) payload['description'] = description
        if (price) payload['price'] = price
        if (countInStock) payload['countInStock'] = countInStock
        if (rating) payload['rating'] = rating
        if (numReviews) payload['numReviews'] = numReviews


        const config = {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }

        const payloadLength = Object.keys(payload).length;

        axios.patch(`${baseUrl}api/product/update/${productId}`, payload, config)
            .then((res) => {
                if (res.status === 200 && payloadLength > 0) {
                    setSuccessMsg(res['data']['message'])
                }
            })
    }


    return (
        <>
            <LogoArea />
            <div className="form-style">
                <h3> UPDATE REQUIRED FIELD</h3>
                <div className="form">
                    <form className="login-form" onSubmit={handleSubmit}>
                        <label>
                            Name
                            <input
                                type="text"
                                name="name"
                                value={inputs.name || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Image url
                            <input
                                type="text"
                                name="image"
                                value={inputs.image || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Brand
                            <input
                                type="text"
                                name="brand"
                                value={inputs.brand || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Category
                            <input
                                type="text"
                                name="category"
                                value={inputs.category || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Description
                            <input
                                type="text"
                                name="description"
                                value={inputs.description || ""}
                                onChange={handleChange}
                            />

                        </label><br /><br />
                        <label>
                            Price
                            <input
                                type="text"
                                name="price"
                                value={inputs.price || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Count In Stock
                            <input
                                type="number"
                                name="countInStock"
                                value={inputs.countInStock || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            Rating
                            <input
                                type="number"
                                name="rating"
                                value={inputs.rating || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <label>
                            No of review
                            <input
                                type="number"
                                name="numReviews"
                                value={inputs.numReviews || ""}
                                onChange={handleChange}
                            />
                        </label><br /><br />
                        <input className="submt-btn" type="submit" value="Update" />
                    </form>
                    <p style={{
                        "color": "green"
                    }}>{successMsg}</p>
                </div>
            </div>
        </>
    )

}
export default UpdateProduct