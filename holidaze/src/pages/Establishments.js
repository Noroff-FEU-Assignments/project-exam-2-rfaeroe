import { useState, useEffect } from 'react';

import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import Item from '../components/Item';

import EnquiryForm from '../components/EnquiryForm';

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

    
const sortArray = type => {
    const types = {
      establishment_price: 'establishment_price',
    };
    const sortProperty = types[type];
    const sorted = [...establish].sort((a, b) => b[sortProperty] - a[sortProperty]);
    console.log(sorted);
    setEstablishments(sorted);
  };




    return (
        <div className={"container"}>
            <h1 className={"pageheading"}>Find accomodations in <span>Bergen</span></h1>

            <EnquiryForm/>
            <div className={"establishments row"}>
            <select onChange={(e) => sortArray(e.target.value)}>
                <option value="default">Price - Low to High</option>
                <option value="establishment_price">Price - High to Low</option>
            </select>
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