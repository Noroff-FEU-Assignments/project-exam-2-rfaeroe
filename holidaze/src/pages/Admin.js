import { useContext, useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Admin = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [establishments, setEstablishments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(false);
    const [render, setRender] = useState(null);

    useEffect(() => {
        const getData = async () => {
            try {
                const responseEst = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);
                const responseCon = await axios.get(`${BASE_URL}/contacts`);
                const responseEnq = await axios.get(`${BASE_URL}/enquiries`);
                setEstablishments(responseEst.data);
                setContacts(responseCon.data);
                setEnquiries(responseEnq.data);
            } catch (error) {
                console.log(error);
            }
        };
        getData();
    }, [render]);


    if (!auth) {
        history.push('/login');
    }

    return (
        <div className={"container"}>
            <h1 className={"pageheading"}>Admin<span> Panel</span></h1>
            <div className="wrapper">
                <div className={"establishment-section"}>
                    <h2 className={"section-title"}>Enquiries</h2>
                    {enquiries.map((enquiry) => {
                        console.log(enquiry);
                        return (
                            <div className={"establishment-item row"} key={enquiry.id}>
                                <div className={"establishment-left col-m-8"}>
                                    <p className="establishment-label">Booking: </p>
                                    <p className={"establishment-name"}>{enquiry.name}</p>
                                </div>
                                <div className={"establishment-right col-m-4"}>

                                    <Link to={`/enquiries/${enquiry.id}`} className={"establishment-button"} >
                                        View
                                    </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={"establishment-section"}>
                    <h2 className={"section-title"}>Contacts</h2>
                    {contacts.map((contact) => {
                        return (
                            <div className={"establishment-item row"} key={contact.id}>
                                <div className={"establishment-left col-m-8"}>
                                    <p className="establishment-label">From: </p>
                                    <p className={"establishment-name"}>{contact.sent_by_name}</p>
                                </div>
                                <div className={"establishment-right col-m-4"}>

                                    <Link to={`/contacts/${contact.id}`} className={"establishment-button"} >
                                        View
                            </Link>
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className={"establishment-section"}>
                    <h2 className={"section-title"}>Establishments</h2>
                    <div className="button-wrapper">
                        <Link className={"button-add"} to='/add'>Add Establishment <FontAwesomeIcon icon={faPlus} /></Link>
                    </div>
                    {establishments.map((est) => {
                        return (
                            <div className={"establishment-item row"} key={est.id}>
                                <div className={"establishment-wrapper"}>
                                    <div className={"establishment-left col-m-8"}>
                                        <Link to={`/est/${est.id}`}>
                                            <img className={"establishment-image"} src={est.establishment_image} alt={est.establishment_name} />
                                        </Link>
                                        <Link to={`/est/${est.id}`}>
                                            <p className={"establishment-name"}>{est.establishment_name}</p>
                                        </Link>
                                    </div>
                                    <div className={"establishment-right col-m-4"}>
                                        <Link to={`/edit/${est.id}`} className={"establishment-button"} >
                                            Edit
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Admin;

