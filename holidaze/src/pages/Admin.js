import { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import Modal from '../components/Modal';
import ContactModal from '../components/ContactModal';


const Admin = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [establishments, setEstablishments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [render] = useState(null);
    const [show, setShow] = useState(false);
    const [showContact, setShowContact] = useState(false);


    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);
                setEstablishments(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEstablishments();
    }, []);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/contacts`);
                setContacts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getContacts();
    }, []);

    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/enquiries`);
                setEnquiries(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEnquiries();
    }, []);

    if (!auth) {
        history.push('/login');
    }

    return (
        <div className={"container"}>
            <h1 className={"pageheading"}>Admin page</h1>

            <div className={"establishment-section"}>
                <h2 className={"section-title"}>Enquiries</h2>
                {enquiries.map((enquiry) => {

                    return (
                        <div className={"establishment-item row"} key={enquiry.id}>
                            <div className={"establishment-left col-m-6"}>
                                <p className={"establishment-name"}>{enquiry.date_from}</p>
                            </div>
                            <div className={"establishment-right col-m-6"}>
                                <p className={"establishment-name"}>{enquiry.date_to}</p>
                                <button key={enquiry.id} onClick={() => setShow(true)} className={"button establishment-button"} >
                                    View
                                    </button>
                            </div>
                            <Modal
                                id={enquiry.id}
                                name={enquiry.name}
                                fromDate={enquiry.date_from}
                                toDate={enquiry.date_to}
                                adults={enquiry.adults}
                                children={enquiry.children}
                                onClose={() => setShow(false)} show={show}
                            />
                        </div>
                    );
                })}
            </div>

            <div className={"establishment-section"}>
                <h2 className={"section-title"}>Contacts</h2>
                {contacts.map((contact) => {
                    console.log(contact);
                    return (
                        <div className={"establishment-item row"} key={contact.id}>
                            <div className={"establishment-left col-m-6"}>
                                <p className={"establishment-name"}>{contact.sent_by_name}</p>
                                Subject:
                                <p className={"establishment-name"}>{contact.subject}</p>
                            </div>
                            <div className={"establishment-right col-m-6"}>

                                <button key={contact.id} onClick={() => setShowContact(true)} className={"button establishment-button"} >
                                    View
                            </button>
                            </div>
                            <ContactModal

                                id={contact.id}
                                fromName={contact.sent_by_name}
                                email={contact.sent_by_mail}
                                subject={contact.subject}
                                message={contact.message}
                                onClose={() => setShowContact(false)} show={showContact}
                            />
                        </div>
                    );
                })}
            </div>

            <div className={"establishment-section"}>
                <h2 className={"section-title"}>Establishments</h2>
                <Link className={"button button--add"} to='/add'>New establishment</Link>
                {establishments.map((est) => {
                    return (
                        <div className={"establishment-item row"} key={est.id}>
                            <div className={"establishment-wrapper"}>
                                <div className={"establishment-left col-m-6"}>
                                    <Link to={`/est/${est.id}`}>
                                        <img className={"establishment-image"} src={est.establishment_image} alt={est.establishment_name} />
                                    </Link>
                                    <Link to={`/est/${est.id}`}>
                                        <p className={"establishment-name"}>{est.establishment_name}</p>
                                    </Link>
                                </div>
                                <div className={"establishment-right col-m-6"}>
                                    <Link to={`/edit/${est.id}`} className={"button establishment-button"} >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Admin;

