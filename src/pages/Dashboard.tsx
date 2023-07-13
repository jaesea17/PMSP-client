import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/baseUrl";
import Create from "../components/reusables/CreateButton";
import LogoArea from "../components/reusables/LogoArea";
import SignOut from "../components/reusables/Signout";

function Dashboard() {
    const [products, setProducts] = useState([]);
    const [fullname, setFullname] = useState("");
    const token = localStorage.getItem('token')
    const [clickedDelete, setClickedDelete] = useState(true);


    const navigate = useNavigate();

    const getProducts = () => {
        const userId = localStorage.getItem('userId');
        axios.get(`${baseUrl}api/user/read/${userId}`)
            .then((result) => {
                const fullname = result['data']['record']['fullname']
                const products = result['data']['record']['products'];
                setProducts(products);
                setFullname(fullname);
            })
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    }



    useEffect(() => {
        getProducts();
    }, [clickedDelete]);


    return (
        <div>
            <LogoArea /><br />
            <h1>
                Welcome  {fullname}
            </h1>

            <SignOut />
            <Create />

            <main style={{ "marginTop": "50px" }}>
                {
                    products.map(product => {
                        return (
                            <div key={product['id']} style={{
                                "padding": "2rem",
                                "margin": "2rem"
                            }}>
                                <div>{product['name']}</div>
                                <div><img src={product['image']} alt="A shoe image" width="400" height="400" /></div>
                                <div>{product['brand']}</div>
                                <div>₦ {product['price']}</div>
                                <button onClick={() => {
                                    const productId = product['id'];
                                    localStorage.setItem('productId', productId);
                                    navigate('/update-product')
                                }}>Update</button>
                                <button onClick={() => {
                                    const productId = product['id'];
                                    axios.delete(`${baseUrl}api/product/delete/${productId}`, config)
                                        .then((res) => {
                                            if (res['status'] === 200) { setClickedDelete(prev => !prev) }
                                        })
                                }}>Delete</button>
                            </div>
                        )
                    })
                }
            </main>


        </div>
    );
}

export default Dashboard;