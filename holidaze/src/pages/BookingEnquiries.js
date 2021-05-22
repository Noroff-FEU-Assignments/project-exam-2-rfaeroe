import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const BookingEnquiries = () => {
    const [booking, setBookingEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useHistory();
    const { id } = useParams();
    if (!id) {
        history.push("/");
    }

    const url = BASE_URL + "/enquiries" + "/" + id;
    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setBookingEnquiries(response.data);
                } else {
                    setError("An error occured");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, [url]);

    console.log(booking.id);

    if (loading) {
        return <h1 className="loading">Loading so much</h1>;
    }
    if (error) {
        return <div>ERROR: An error occured</div>;
    }

    return (
        <div className={"enquiry sectionwrapper row"}>
            <div className={"establishments-card col-d-12"}>
                <Link className="goback" to="/admin"><FontAwesomeIcon icon={faArrowLeft} /> Go back</Link>
                <div className={"card"}>
                    <div className={"card-content"}>
                        <div className={"card-header"}>
                            <h2 className={"card-title"}>Booking enquiry</h2>
                        </div>
                        <div className={"card-body"}>
                            <ul>
                                <li className="col-m-12 col-d-12">Establishment:<span>{booking.name}</span></li>
                                <li className="col-m-12 col-d-6">From: <span>{booking.date_from}</span></li>
                                <li className="col-m-12 col-d-6">To: <span>{booking.date_to}</span></li>
                                <li className="col-m-12 col-d-6">Adults: <span>{booking.adults}</span></li>
                                <li className="col-m-12 col-d-6">Children: <span>{booking.children}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default BookingEnquiries;