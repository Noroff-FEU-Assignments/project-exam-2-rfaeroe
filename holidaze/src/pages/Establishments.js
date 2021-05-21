import { useState, useEffect } from 'react';

import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import MultiItem from '../components/MultiItem';

const Establishments = () => {
    const [establish, setEstablishments] = useState([]);
    const [filter, setFilter] = useState([null]);

    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);
                setEstablishments(response.data);
                setFilter(response.data);
            } catch (error) {
                console.log(error);
            }

        };
        getEstablishments();
    }, []);

    return (
        <div className={"container"}>
            <h1 className={"pageheading"}>Find accomodations in <span>Bergen</span></h1>
            <div className={"establishments sectionwrapper row"}>
                {establish.map((est) => {
                    return (
                        <div className={"establishments-card col-d-6"} key={est.id}>
                            <MultiItem
                                id={est.id}
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