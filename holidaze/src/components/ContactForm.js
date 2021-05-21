import { useState } from 'react';
import useAxios from '../utils/useAxios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from '../utils/schemas';

import { BASE_URL } from '../utils/constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';


const ContactForm = () => {
    const http = useAxios();
    const [submitting, setSubmitting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(contactSchema),
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setPostError(null);

        console.log(data);
        try {
            const response = await http.post(`${BASE_URL}/contacts`, data);
            console.log('response', response.data);
            setSuccess(true);
        } catch (error) {
            console.log('error', error);
            setPostError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className={"sectionwrapper"}>
            <div className={"form-wrapper"}>
                <form className='form col-d-6 col-m-12' onSubmit={handleSubmit(onSubmit)}>
                    {postError && <p>{postError}</p>}
                    <fieldset disabled={submitting}>
                        <div className='form-group'>
                            <label for="sent_by_name">Name:</label>
                            <input name="sent_by_name" ref={register} type='text' />
                            {errors.sent_by_name && <p>{errors.sent_by_name.message}</p>}
                        </div>

                        <div className='form-group'>
                            <label for="sent_by_mail">Email:</label>
                            <input name="sent_by_mail" ref={register} type='text' />
                            {errors.sent_by_mail && <p>{errors.sent_by_mail.message}</p>}
                        </div>

                        <div className='form-group'>
                            <label for="subject">Subject:</label>
                            <input name="subject" ref={register} type='text' />
                            {errors.subject && <p>{errors.subject.message}</p>}
                        </div>

                        <div className='form-group'>
                            <label for="message">Message:</label>
                            <textarea name="message" ref={register} type='text' />
                            {errors.message && <p>{errors.message.message}</p>}
                        </div>
                        <div className="form-group">
                            <button className={"btn"} id="formButton">Send</button>
                        </div>
                    </fieldset>
                    {success ? <p className={"success"}>Thanks for reaching out, we'll get back to you asap</p> : null}
                </form>
                <div className={"form-right col-d-6 col-m-12"}>
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


