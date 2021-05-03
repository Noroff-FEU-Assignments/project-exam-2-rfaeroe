import { useEffect, useState } from 'react';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import axios from 'axios';
import { Link } from "react-router-dom";

import bikeImage from "../media/bike.svg";
import cableCarImage from "../media/cable-car.svg";
import aquariumImage from "../media/fishing.svg";
import boatImage from "../media/boat.svg";


const HomePage = () => {
    const [establishments, setEstablishments] = useState([])
    const [filter, setFilter] = useState(null);
    const [isFiltered, setIsFiltered] = useState(false);
    const [display, setDisplay] = useState(true);
    const [query, setQuery] = useState(true);

    

    useEffect(() => {
        const getEstablishments = async ()=>{
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`)
                setEstablishments(response.data);
            }
            catch (e){
            }
            finally{

            }
        }
        getEstablishments()
    }, [query]);
    

    const handleFiltering = (e) => {
        let filterEstablishments = establishments.filter(est => {
          return est.establishment_name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        });
        setEstablishments(filterEstablishments);
        setIsFiltered(true);
        setDisplay(false)
        
        if (e.target.value < 1){
            setQuery(!query)
        }
      };

      const showTypeahead =()=>{
        setDisplay(false)
      }


console.log(establishments);
    return (   
        <>
            <div className="hero">
                <div id="color-overlay"></div>
                <h1 className={"pageheading"}>Find accomodations in <span>Bergen</span></h1>
    
                <div className="typehead">
                    <input className="typehead-input" placeholder="Find your stay in Bergen" type="text" onChange={(handleFiltering)} onFocus={showTypeahead}  tabIndex="0"/>
                    <div className="typehead-dropdown">
                        {establishments.map((shit)=>{
                            return(
                                <div className="typehead-item" key={shit.id} style={{backgroundColor: "white", display: display? "none": "block" }}>
                                    <Link className="typehead-item-link" to={`est/${shit.id}`}>{shit.establishment_name}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>

            </div>
                <div className="explorebergen">
                    <h2 className="sectiontitle">What does Bergen offer?</h2>
                    <div className="">
                        <div className="card col col-m-12 col-d-3">
                            <div className="card-inner">
                                <img
                                    src={bikeImage}
                                    alt="bike"
                                />
                                <h3>Rent a bike</h3>
                                <p>Explore Bergen city by bike. Bikes is located all over in the city center.</p>
                            </div>
                        </div>

                        <div className="card col col-m-12 col-d-3">
                            <div className="card-inner">
                                <img
                                    src={cableCarImage}
                                    alt="cable car"
                                />
                                <h3>Cable car to mt. ulriken</h3>
                                <p>Take the cable car from Haukeland up to Mt. Ulriken for the perfect view of Bergen city.</p>
                            </div>
                        </div>

                        <div className="card col col-m-12 col-d-3">
                            <div className="card-inner">
                                <img
                                    src={aquariumImage}
                                    alt="Aquarium"
                                />
                                <h3>Aquarium</h3>
                                <p>Visit the Aquarium located at Nordnes with Penguins, fishes and many types of animals.</p>
                            </div>
                        </div>

                        <div className="card col col-m-12 col-d-3">
                            <div className="card-inner">
                                <img
                                    src={boatImage}
                                    alt="boat"
                                />
                                <h3>Explore the fjords</h3>
                                <p>Take a boat trip and explore the fjords and amazing scenary from the ocean.</p>
                            </div>
                        </div>
                    </div>
                </div>
         
        </>
    );
};

export default HomePage;