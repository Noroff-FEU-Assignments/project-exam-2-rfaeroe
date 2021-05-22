import useAxios from '../utils/useAxios';
import { useState } from 'react';
import { ESTABLISHMENTS_PATH } from '../utils/constants';
import { Link } from "react-router-dom";

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { establishmentSchema } from '../utils/schemas';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const AddEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);
    const http = useAxios();

    const [submitting, setSubmitting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(establishmentSchema)
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        setPostError(null);
        console.log(data);

        try {
            const response = await http.post(`${ESTABLISHMENTS_PATH}`, data);
            console.log('response', response.data);
            setEstablishment(response.data);
            setSuccess(true);
        } catch (error) {
            console.log('error', error);
            setPostError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <div className={"container sectionwrapper"}>
            <Link className="goback" to="/admin"><FontAwesomeIcon icon={faArrowLeft} /> Go back</Link>
            <h1 className={"pageheading"}>Add <span>Establishment</span></h1>
            <form className="form" style={{ marginTop: "48px" }} onSubmit={handleSubmit(onSubmit)}>
                {postError && <p>{postError}</p>}
                <fieldset disabled={submitting}>
                    <div className={"form-group"}>
                        <input
                            name='establishment_name'
                            placeholder='Title'
                            ref={register}
                        />
                        {errors.establishment_name && <p className="error">{errors.establishment_name.message}</p>}
                    </div>

                    <div className={"form-group"}>
                        <input
                            name='establishment_price'
                            placeholder='Price'
                            ref={register}
                            type='number'
                            min="1"
                        />
                        {errors.establishment_price && <p className="error">{errors.establishment_price.message}</p>}
                    </div>
                    <div className={"form-group"}>
                        <textarea
                            name='establishment_description'
                            placeholder='Description'
                            ref={register}
                            type='text'
                        />
                        {errors.establishment_description && <p className="error">{errors.establishment_description.message}</p>}
                    </div>
                    <div className={"form-group"}>
                        <input
                            name='establishment_image'
                            placeholder='Image URL'
                            ref={register}
                            type='text'
                        />
                        {errors.establishment_image && <p className="error">{errors.establishment_image.message}</p>}
                    </div>
                    <div className="form-group">
                        <button className="btn" style={{ width: "100%" }} type='submit'>{submitting ? 'Adding...' : 'Add'}</button>
                    </div>

                </fieldset>
                <div className="form-group">
                    {success ? <p className="success">New establishment listing of {establishment.title} was created</p> : null}
                </div>
            </form>
        </div>
    );
};

export default AddEstablishment;