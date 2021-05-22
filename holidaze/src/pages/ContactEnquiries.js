import { useState, useEffect } from "react";
import { BASE_URL, ESTABLISHMENTS_PATH } from "../utils/constants";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import SingleItem from '../components/SingleItem';


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

    console.log(contacts)

    return (
        <div className={"establishments sectionwrapper row"}>
            <div className={"establishments-card col-d-12"}>
            <div className={"card"}>
            <div className={"card-content"}>
                <div className={"card-header"}>
                    <h2 className={"card-title"}>Contact Enquiry</h2>
                </div>
                <div className={"card-body"}>
                    <ul>
                        <li>From name:<span>{contacts.sent_by_name}</span></li>
                        <li>From email: <span>{contacts.sent_by_mail}</span></li>
                        <li>Subject: <span>{contacts.subject}</span></li>
                        <li>Message: <span>{contacts.message}</span></li>
                    </ul>
                </div>
                <div className={"card-footer"}>
                    <a href={`mailto:${contacts.email}`}>Reply</a>
                </div>

            </div>
        </div>
            </div>
        </div>
    );
};
export default ContactEnquiries;