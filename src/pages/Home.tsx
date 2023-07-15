import axios from "axios";
import { useEffect, useState, useRef } from "react";
import Navbar from "../components/reusables/Navbar";
import DashboardBtn from "../components/reusables/DashboardBtn";
import LogoArea from "../components/reusables/LogoArea";
import { baseUrl } from "../utils/baseUrl";
import { addLikes } from "../utils/likes";
import "../styles/Home.css"
import { getTime } from "../utils/getTime";
import { getToken } from "../utils/getToken";
import { useNavigate } from "react-router-dom";

function Home() {
    const [stations, setStations] = useState([]);
    const [activeId, setActiveID] = useState("");
    const [showNav, setShowNav] = useState(true);
    const [showSuccesss, setShowSucess] = useState(false);
    const [userPrice, setUserPrice] = useState(0)
    const [isLoggedin, setIsLoggedin] = useState(false)
    const [likes, setLikes] = useState(0);

    const navigate = useNavigate();


    useEffect(() => {
        console.log('effect ran')
        if (getToken()) {
            setShowNav(false)
            setIsLoggedin(true);
        }
        axios.get(`${baseUrl}api`)
            .then((result) => {
                const stations = result.data?.stations
                setStations(stations);
            })
    }, [])

    const activateSation = (ID: string) => {
        setActiveID(ID)
        setShowSucess(false);
    }

    const letKnow = () => {
        if (!isLoggedin) {
            navigate('/login')
        }
    }

    const config = {
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
    }
    const handleSubmit = (e: any, cId: string) => {
        e.preventDefault();
        axios.post(`${baseUrl}api/observation/create`, {
            "price": userPrice, "commodityId": cId
        }, config)
            .then((res) => {
                if (res.status === 201) {
                    console.log("User price created sucessfully");
                    setUserPrice(0);
                    setShowSucess(true);
                }
            }).catch((err) => {
                if (err) {
                    console.log('the err', err['response'])
                    const theError = err.response?.data?.message;
                }

            })
    }

    return (
        <div>
            <LogoArea />
            {showNav && <Navbar />}<br />
            {/* <DashboardBtn /> */}

            <main style={{ "marginTop": "50px", "paddingLeft": "3%" }}>
                <p>Welcome, select a station and view the details.<br />
                    Let us know the price you bought at or "like" the "latest buy" if the same.<br />
                    NB: Five "likes" automatically updates the pump price.
                </p>
                {
                    stations.map((result: any) => {
                        return (
                            <div style={{
                                "marginLeft": "2rem"
                            }}>
                                <div onClick={() => activateSation(result.id)} className="station-name"><h3>{result.name}</h3></div>
                                <div className={`${activeId === result.id ? 'show-div' : 'hide-div'}`} key={result.id} >
                                    <>
                                        {result.commodities.map((comResult: any) => {
                                            const commId = comResult.id;
                                            const cId = "commodityId";
                                            return (
                                                <>
                                                    {comResult.commodity}: ₦<span style={{ "color": 'green' }}>{comResult.price}</span>/Litre<br></br><br></br>
                                                    {comResult.observations.map((obsvnResult: any) => {
                                                        const dateString = obsvnResult.createdAt;
                                                        const observationId = obsvnResult.id, price = obsvnResult.price
                                                        const obvId = "observationId";
                                                        return (
                                                            <>
                                                                <h4>Latest buys</h4>
                                                                <p><span style={{ "fontStyle": 'italic', "color": 'green' }}>{obsvnResult.user?.userName}</span> bought at: ₦<span style={{ "color": 'green' }}>{price}</span>/Litre, {getTime(dateString)}</p>
                                                                <input
                                                                    type="button"
                                                                    value='like'
                                                                    onClick={() => {
                                                                        addLikes(obsvnResult, {
                                                                            "url": `${baseUrl}api/observation/update/${obvId}:${observationId},${cId}:${commId}`,
                                                                            price,
                                                                            setLikes,
                                                                            observationId
                                                                        })

                                                                    }}
                                                                />: {obsvnResult.likes}<br /><br />
                                                            </>
                                                        )
                                                    })}
                                                    <h4>Bought at a different price?</h4>
                                                    {!isLoggedin && <button onClick={letKnow}>LET US KNOW</button>}
                                                    {isLoggedin && <form onSubmit={(e: any) => handleSubmit(e, commId)}>
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={userPrice}
                                                            onChange={(e: any) => setUserPrice(e.target.value)}
                                                        />
                                                        <input
                                                            type="submit"
                                                        />
                                                    </form>}<br />
                                                    {showSuccesss && <p style={{ "fontStyle": 'italic', "color": 'green' }}>Price successfully recorded!</p>}
                                                </>
                                            )
                                        })}
                                    </>
                                    {/* <div><img src={result['image']} alt="A shoe image" width="400" height="400" /></div>
                                <div>{result['brand']}</div>
                                <div>₦ {result['price']}</div> */}
                                </div>
                            </div>
                        )
                    })
                }
            </main>
        </div>
    );

}

export default Home;