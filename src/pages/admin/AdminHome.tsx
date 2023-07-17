import axios from "axios";
import { useEffect, useState, useRef } from "react";
// import Navbar from "../../components/reusables/Navbar";
// import DashboardBtn from "../components/reusables/DashboardBtn";
import LogoArea from "../../components/reusables/LogoArea";
import { baseUrl } from "../../utils/baseUrl";
// import { addLikes } from "../utils/likes";
import "../../styles/Home.css"
import { getTime } from "../../utils/getTime";
import { getAdminToken } from "../../utils/getToken";
import { useNavigate } from "react-router-dom";

function AdminHome() {
    const [stations, setStations] = useState([]);
    const [activeId, setActiveID] = useState("");
    // const [showNav, setShowNav] = useState(true);
    const [showSuccess, setShowSucess] = useState(false);
    const [adminPrice, setAdminPrice] = useState(0)
    const [isLoggedin, setIsLoggedin] = useState(false)
    // const [likes, setLikes] = useState(0);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        console.log('effect ran')
        if (getAdminToken()) {
            // setShowNav(false)
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


    const config = {
        headers: {
            "Authorization": `Bearer ${getAdminToken()}`
        }
    }
    const handleSubmit = (e: any, cId: string) => {
        e.preventDefault();
        axios.patch(`${baseUrl}api/admin/petrol/update/${cId}`, {
            "price": adminPrice
        }, config)
            .then((res) => {
                if (res.status === 200) {
                    console.log("User price updated");
                    setAdminPrice(0);
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
            {/* {showNav && <Navbar />}<br /> */}
            <main style={{ "marginTop": "50px", "paddingLeft": "3%" }}>
                <form >
                    <input
                        type="search"
                        name="search"
                        value={search}
                        placeholder="search"
                        onChange={(e: any) => setSearch(e.target.value)}
                    />
                </form>
                {
                    stations.map((result: any) => {
                        if (result.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
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
                                                        {comResult.commodity}: ₦<span style={{ "color": 'green' }}>{comResult.price}</span>/Litre
                                                        <form onSubmit={(e: any) => handleSubmit(e, commId)}>
                                                            <input
                                                                type="number"
                                                                name="price"
                                                                value={adminPrice}
                                                                onChange={(e: any) => setAdminPrice(e.target.value)}
                                                            />
                                                            <input
                                                                type="submit"
                                                                value="Update"
                                                            />
                                                        </form><br />
                                                        {showSuccess && <p style={{ "fontStyle": 'italic', "color": 'green' }}>Price successfully updated!</p>}
                                                        <br></br>
                                                        {comResult.observations.map((obsvnResult: any) => {
                                                            const dateString = obsvnResult.createdAt;
                                                            const observationId = obsvnResult.id, price = obsvnResult.price
                                                            const obvId = "observationId";
                                                            return (
                                                                <>
                                                                    <h4>Latest buys</h4>
                                                                    <p><span style={{ "fontStyle": 'italic', "color": 'green' }}>
                                                                        {obsvnResult.user?.userName}</span> bought at: ₦<span style={{ "color": 'green' }}>
                                                                            {price}</span>/Litre, {getTime(dateString)}</p>
                                                                </>
                                                            )
                                                        })}
                                                    </>
                                                )
                                            })}
                                        </>
                                    </div>
                                </div>
                            )
                        }
                    })
                }
            </main>
        </div>
    );

}

export default AdminHome;