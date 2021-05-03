import {useState} from 'react'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from '../utils/schemas';


import axios from 'axios';
import { BASE_URL } from '../utils/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faEnvelope, faPhone  } from '@fortawesome/free-solid-svg-icons'


const ContactForm = () => {
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(contactSchema),
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setSubmitError(null);

        console.log(data);
        try {
            const response = await axios.post(`${BASE_URL}/contacts`, data);
            console.log('response', response.data);
        } catch (error) {
            console.log('error', error);
            setSubmitError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    console.log(errors);
    return (
        <div className={"sectionwrapper"}>
            <div className={"form-wrapper"}>
                <form className='form col-d-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <input name="sent_by_name" placeholder='First name' ref={register} type='text' />
                        {errors.sent_by_name && <p>{errors.sent_by_name.message}</p>}
                    </div>
        
                    <div className='form-group'>
                        <input name="sent_by_mail" placeholder='Email' ref={register} type='text' />
                        {errors.sent_by_mail && <p>{errors.sent_by_mail.message}</p>}
                    </div>

                    <div className='form-group'>
                        <input name="subject" placeholder='Subject' ref={register} type='text' />
                        {errors.subject && <p>{errors.subject.message}</p>}
                    </div>

                    <div className='form-group'>
                        <textarea name="message" placeholder='Message...' ref={register} type='text' />
                        {errors.message && <p>{errors.message.message}</p>}
                    </div>
                    <button className={"button contact-button"}>Send</button>
                </form>
                <div className={"form-right col-d-6"}>
                    <ul className={"contact-list"}>
                        <li className={"contact-list-item"}>
                        <FontAwesomeIcon icon={faPhone} />
                            <p>+47 90 90 90 90</p>
                        </li>
                        <li className={"contact-list-item"}>
                        <FontAwesomeIcon icon={faEnvelope} />
                            <p>contact@holidaze.com</p>
                        </li>
                        <li className={"contact-list-item"}>
                        <FontAwesomeIcon icon={faMapMarkedAlt} />
                            <p>Ulriksbakken 7, 5050 Bergen</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>


    );
};

export default ContactForm;


