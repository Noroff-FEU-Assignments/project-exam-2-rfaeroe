import {useContext, useState, useEffect} from 'react';
import {useHistory, Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL, ESTABLISHMENTS_PATH} from '../utils/constants';
import EditEstablishment from '../components/EditEstablishment';




const AdminPage = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [establishments, setEstablishments] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [enquiries, setEnquiries] = useState([]);
    const [render, setRender] = useState(null);
 


    useEffect(() => {
        const getEstablishments = async () => {
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`);
                console.log(response);
                setEstablishments(response.data);
            } catch(error) {
                console.log(error);
            }
        };
        getEstablishments();
    }, [render]);

    useEffect(() => {
        const getContacts = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/contacts`);
                console.log(response);
                setContacts(response.data);
            } catch(error) {
                console.log(error);
            }
        };
        getContacts();
    }, [render]);

    useEffect(() => {
        const getEnquiries = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/enquiries`);
                console.log(response);
                setEnquiries(response.data);
            } catch(error) {
                console.log(error);
            }
        };
        getEnquiries();
    }, [render]);


    if(!auth) {
        history.push('/login');
    }

    console.log(establishments);
    console.log(contacts);
    return (   
        <div className={"container"}>
            <h1 className={"pageheading"}>Admin page</h1>

            <div className={"establishment-section"}>
                <h2 className={"section-title"}>Enquiries</h2>
                {enquiries.map((enquiry) => {
                
                    return (
                        <div className={"establishment-item row"} key={enquiry.id}>
                            <Link className={"establishment-wrapper"} to={`/establishments/${enquiry.id}`}>
                                <div className={"establishment-left col-m-6"}>
                                    <p className={"establishment-name"}>{enquiry.date_from}</p>
                                   

                                </div>
                                <div className={"establishment-right col-m-6"}>
                                    <p className={"establishment-name"}>{enquiry.date_to}</p>
                                    <button className={"button establishment-button"} onClick={() => EditEstablishment(enquiry.id)}>
                                        View
                                    </button>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <div className={"establishment-section"}>
                <h2 className={"section-title"}>contacts</h2>
                {contacts.map((contact) => {
                    console.log(contact)
                    return (
                        <div className={"establishment-item row"} key={contact.id}>
                            <Link className={"establishment-wrapper"} to={`/establishments/${contact.id}`}>
                                <div className={"establishment-left col-m-6"}>
                                    <p className={"establishment-name"}>{contact.sent_by_name}</p>
                                    <p className={"establishment-name"}>{contact.subject}</p>

                                </div>
                                <div className={"establishment-right col-m-6"}>
                                    
                                    <button className={"button establishment-button"} onClick={() => EditEstablishment(contact.id)}>
                                        View
                                    </button>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>

            <div className={"establishment-section"}>
                <h2 className={"section-title"}>Establishments</h2>
                {establishments.map((est) => {
                    return (
                        <div className={"establishment-item row"} key={est.id}>
                            <Link className={"establishment-wrapper"} to={`/establishments/${est.id}`}>
                                <div className={"establishment-left col-m-6"}>
                                    <img className={"establishment-image"} src={est.establishment_image} alt={est.establishment_name} />
                                    <p className={"establishment-name"}>{est.establishment_name}</p>
                                </div>
                                <div className={"establishment-right col-m-6"}>
                                    <button className={"button establishment-button"} onClick={() => EditEstablishment(est.id)}>
                                        Edit
                                    </button>
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default AdminPage;

