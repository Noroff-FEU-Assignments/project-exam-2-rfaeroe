import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactShema } from '../utils/schemas';
import { faPhone, faEnvelope, faMapMarkedAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const ContactForm = () => {
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(contactShema),
    });

    function onSubmit() {
        console.log("form was submitted");
    }

    console.log(errors);
    return (
        <div className={"sectionwrapper"}>
            <div className={"form-wrapper"}>
                <form className='form col-d-6' onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <input name="firstName" placeholder='First name' ref={register} type='text' />
                        {errors.firstName && <p>{errors.firstName.message}</p>}
                    </div>
                    <div className='form-group'>
                        <input name="lastName" placeholder='Last name' ref={register} type='text' />
                        {errors.lastName && <p>{errors.lastName.message}</p>}
                    </div>
                    <div className='form-group'>
                        <input name="email" placeholder='Email' ref={register} type='text' />
                        {errors.email && <p>{errors.email.message}</p>}
                    </div>
                    <div className='form-group'>
                        <select name="subject" ref={register} type='text'>
                            <option value="">Select subject</option>
                            <option value="option1" ref={register} type='text'>Website improvement suggestions</option>
                            <option value="option2" ref={register} type='text'>Wrong information on site</option>
                        </select>
                        {errors.subject && <p>{errors.subject.message}</p>}
                    </div>
                    <div className='form-group'>
                        <textarea name="message" placeholder='Message...' ref={register} type='text' />
                        {errors.message && <p>{errors.message.message}</p>}
                    </div>
                    <button className={"button contact-button"} onSubmit={onsubmit}>Send</button>
                </form>
                <div className={"form-right col-d-6"}>
                    <ul className={"contact-list"}>
                        <li>
                            <FontAwesomeIcon icon={faPhone} />
                            <p>+47 90 90 90 90</p>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={faEnvelope} />
                            <p>contact@holidaze.com</p>
                        </li>
                        <li>
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


