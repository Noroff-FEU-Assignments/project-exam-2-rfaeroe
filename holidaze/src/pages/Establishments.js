import { useState, useEffect } from 'react';

import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import Item from '../components/Item';



const Establishments = () => {
    const [establish, setEstablishments] = useState([]);

    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);
                console.log(response);
                setEstablishments(response.data);
            } catch (error) {
                console.log(error);
            }

        };


        getEstablishments();
    }, []);





    return (
        <div className={"container"}>
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

            <div className={"establishments sectionwrapper row"}>
                {establish.map((est) => {
                    return (
                        <div className={"establishments-card col-d-6"} key={est.id}>
                            <Item
                                id={est.id}
                                key={est.id}
                                image={est.establishment_image}
                                name={est.establishment_name}
                                price={est.establishment_price}
                                description={est.establishment_description}

                            />


                        </div>
                    );
                })}
            </div>

        </div>
    );
};

export default Establishments;