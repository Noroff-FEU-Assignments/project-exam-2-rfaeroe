import { useState, useEffect } from 'react';

import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import MultiItem from '../components/MultiItem';

import Loading from '../components/Loading';

const Establishments = () => {
    const [establish, setEstablishments] = useState([]);
    const [filter, setFilter] = useState([null]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);
                setEstablishments(response.data);
                setFilter(response.data);
                setLoading(true);
            } catch (error) {
                console.log(error);
            }

        };
        getEstablishments();
    }, []);

    console.log(establish);
    console.log(loading);

    return (
        <div className={"container"}>
            <h1 className={"pageheading"}>Find accomodations in <span>Bergen</span></h1>
            <div className={"establishments sectionwrapper row"}>
                {loading ? establish.map((est) => {
                    return (
                        <div className={"establishments-card col-m-12 col-sm-6 col-d-6"} key={est.id}>
                            <MultiItem
                                id={est.id}
                                image={est.establishment_image}
                                name={est.establishment_name}
                                price={est.establishment_price}
                                description={est.establishment_description}
                            />
                        </div>
                    );
                }) : <Loading />}
            </div>
        </div>
    );
};

export default Establishments;