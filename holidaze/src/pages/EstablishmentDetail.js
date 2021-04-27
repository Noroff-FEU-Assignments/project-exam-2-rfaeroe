import { useState, useEffect } from "react";
import { BASE_URL, ESTABLISHMENTS_PATH } from "../utils/constants";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Item from '../components/Item';

const EstablishmentDetail = () => {
    const [establishment, setEstablishments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useHistory();
    const { id } = useParams();
    if (!id) {
        history.push("/");
    }
    const url = BASE_URL + ESTABLISHMENTS_PATH + "/" + id;
    useEffect(() => {
        const fetchEstablishments = async () => {
            try {
                const response = await axios.get(url);
                console.log(response);
                if (response.status === 200) {
                    setEstablishments(response.data);
                } else {
                    setError("An error occured");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchEstablishments();
    }, [url]);

    if (loading) {
        return <h1 className="loading">Loading so much</h1>;
    }
    if (error) {
        return <div>ERROR: An error occured</div>;
    }



    return (
        <div className={"establishments sectionwrapper row"}>
            <div className={"establishments-card col-d-12"}>
                <Item
                    id={establishment.id}
                    key={establishment.id}
                    image={establishment.establishment_image}
                    name={establishment.establishment_name}
                    price={establishment.establishment_price}
                    description={establishment.establishment_description}
                    location={establishment.establishment_location}
                    facilities={establishment.establishment_facilities}
                />

            </div>
        </div>

    );
};
export default EstablishmentDetail;