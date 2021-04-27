import { useEffect } from 'react';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import axios from 'axios';


import bikeImage from "../media/bike.svg";
import cableCarImage from "../media/cable-car.svg";
import aquariumImage from "../media/fishing.svg";
import boatImage from "../media/boat.svg";


const HomePage = () => {
    useEffect(() => {
        axios
            .get(`${BASE_URL}${ESTABLISHMENTS_PATH}`)
            .then(response => console.log(response));
    }, []);

    return (
        <>
            <div className="hero">
                <div id="color-overlay"></div>
                <h1 className={"pageheading"}>Find accomodations in <span>Bergen</span></h1>
                <form className="form booking-box">
                    <div className="form-inner booking-box-inner">
                        <div className="row">
                            <div className="search-box form-group col-d-6">
                                <label>Place</label>
                                <input className="booking-box-search-input"></input>
                            </div>
                            <div className="search-box form-group col-d-3">
                                <label>Adults</label>
                                <select className="booking-box-option" id="adults">
                                    <option className="option" value hidden></option>
                                    <option className="option" value="0">0</option>
                                    <option className="option" value="1">1</option>
                                    <option className="option" value="2">2</option>
                                    <option className="option" value="3">3</option>
                                    <option className="option" value="4">4</option>
                                    <option className="option" value="5">5</option>
                                    <option className="option" value="6">6</option>
                                    <option className="option" value="7">7</option>
                                    <option className="option" value="8">8</option>
                                    <option className="option" value="9">9</option>
                                    <option className="option" value="10">10</option>
                                </select>
                            </div>
                            <div className="search-box form-group col-d-3">
                                <label>Children</label>
                                <select className="booking-box-option" id="children">
                                    <option className="option" value hidden></option>
                                    <option className="option" value="0">0</option>
                                    <option className="option" value="1">1</option>
                                    <option className="option" value="2">2</option>
                                    <option className="option" value="3">3</option>
                                    <option className="option" value="4">4</option>
                                    <option className="option" value="5">5</option>
                                    <option className="option" value="6">6</option>
                                    <option className="option" value="7">7</option>
                                    <option className="option" value="8">8</option>
                                    <option className="option" value="9">9</option>
                                    <option className="option" value="10">10</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="booking-box-date form-group col-d-6">
                                <label className="date-label" for="datefrom">From</label>
                                <input className="booking-box-date-input" type="date" name="datefrom" value></input>
                            </div>
                            <div className="booking-box-date form-group col-d-6">
                                <label className="date-label" for="dateto">To</label>
                                <input className="booking-box-date-input" type="date" name="dateto" value></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="button">Find accomodation</button>
                        </div>
                    </div>
                </form>
            </div>
            <div className="sectionwrapper">
                <div className="explorebergen">
                    <h2 className="sectiontitle">What does Bergen offer?</h2>
                    <div className="row">
                        <div className="card col col-d-3">
                            <div className="card-inner">
                                <img
                                    src={bikeImage}
                                    alt="bike"
                                />
                                <h3>Rent a bike</h3>
                                <p>Explore Bergen city by bike. Bikes is located all over in the city center.</p>
                            </div>
                        </div>

                        <div className="card col col-d-3">
                            <div className="card-inner">
                                <img
                                    src={cableCarImage}
                                    alt="cable car"
                                />
                                <h3>Cable car to mt. ulriken</h3>
                                <p>Take the cable car from Haukeland up to Mt. Ulriken for the perfect view of Bergen city.</p>
                            </div>
                        </div>

                        <div className="card col col-d-3">
                            <div className="card-inner">
                                <img
                                    src={aquariumImage}
                                    alt="Aquarium"
                                />
                                <h3>Aquarium</h3>
                                <p>Visit the Aquarium located at Nordnes with Penguins, fishes and many types of animals.</p>
                            </div>
                        </div>

                        <div className="card col col-d-3">
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
            </div>
        </>
    );
};

export default HomePage;