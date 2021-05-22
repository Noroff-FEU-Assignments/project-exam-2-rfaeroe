import { useState, useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useParams, useHistory, Link } from "react-router-dom";
import axios from "axios";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const ContactEnquiries = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    let history = useHistory();
    const { id } = useParams();
    if (!id) {
        history.push("/");
    }

    const url = BASE_URL + "/contacts" + "/" + id;
    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get(url);
                if (response.status === 200) {
                    setContacts(response.data);
                } else {
                    setError("An error occured");
                }
            } catch (error) {
                setError(error.toString());
            } finally {
                setLoading(false);
            }
        };

        fetchContacts();
    }, [url]);

    if (loading) {
        return <h1 className="loading">Loading so much</h1>;
    }
    if (error) {
        return <div>ERROR: An error occured</div>;
    }

    console.log(contacts);

    return (
        <div className={"enquiry sectionwrapper row"}>
            <div className={"establishments-card col-d-12"}>
                <Link className="goback" to="/admin"><FontAwesomeIcon icon={faArrowLeft} /> Go back</Link>
                <div className={"card"}>
                    <div className={"card-content"}>
                        <div className={"card-header"}>
                            <h2 className={"card-title"}>Contact Enquiry</h2>
                        </div>
                        <div className={"card-body"}>
                            <ul>
                                <li className="col-m-12">From name:<span>{contacts.sent_by_name}</span></li>
                                <li className="col-m-12">From email: <span>{contacts.sent_by_mail}</span></li>
                                <li className="col-m-12">Subject: <span>{contacts.subject}</span></li>
                                <li className="col-m-12 contact-message">Message: <span className="no-margin">{contacts.message}</span></li>
                            </ul>
                        </div>
                        <div className={"card-footer"}>
                            <a className="reply" href={`mailto:${contacts.email}`}>Reply</a>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
export default ContactEnquiries;