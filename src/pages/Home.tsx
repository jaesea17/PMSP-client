import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/reusables/Navbar";
import DashboardBtn from "../components/reusables/DashboardBtn";
import LogoArea from "../components/reusables/LogoArea";
import { baseUrl } from "../utils/baseUrl";
import { addLikes } from "../utils/likes";
import "../styles/Home.css"
import { getTime } from "../utils/getTime";

function Home() {
    const [stations, setStations] = useState([]);
    const [activeId, setActiveID] = useState("");
    const [likes, setLikes] = useState(0);

    useEffect(() => {
        console.log('effect ran')
        axios.get(`${baseUrl}api`)
            .then((result) => {
                const stations = result.data?.stations
                setStations(result.data?.stations);
            })
    }, [])

    const activateSation = (ID: string) => {
        setActiveID(ID)
    }

    return (
        <div>
            <LogoArea />
            <Navbar /><br />
            {/* <DashboardBtn /> */}

            <main style={{ "marginTop": "50px", "paddingLeft": "3%" }}>
                <p>Welcome, select a station and view the details.<br />
                    Let us know the different price you bought at or like the "latest buy" if thesame.<br />
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
                                                    {comResult.commodity}: ₦{comResult.price}/Litre<br></br><br></br>
                                                    {comResult.observations.map((obsvnResult: any) => {
                                                        const dateString = obsvnResult.createdAt;
                                                        const observationId = obsvnResult.id, price = obsvnResult.price
                                                        const obvId = "observationId";
                                                        return (
                                                            <>
                                                                <h4>Latest buys</h4>
                                                                <p><span style={{ "fontStyle": 'italic' }}>{obsvnResult.user?.userName}</span> bought at: ₦{price}/Litre ......... {getTime(dateString)}</p>
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
                                                                />: {obsvnResult.likes}
                                                            </>
                                                        )
                                                    })}
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