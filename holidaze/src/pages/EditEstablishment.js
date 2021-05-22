import { useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useState, useEffect } from 'react';
import { ESTABLISHMENTS_PATH } from '../utils/constants';
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


import { establishmentSchema } from '../utils/schemas';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';


const EditEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);
    const { id } = useParams();
    const http = useAxios();

    const [submitting, setSubmitting] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(establishmentSchema)
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        setUpdateError(null);
        console.log(data);
        try {
            const response = await http.put(`${ESTABLISHMENTS_PATH}/${id}`, data);
            console.log('response', response.data);
            setEstablishment(response.data);
            setSuccess(true);
        } catch (error) {
            console.log('error', error);
            setUpdateError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const getEstablishment = async () => {
            try {
                const response = await http.get(`${ESTABLISHMENTS_PATH}/${id}`);
                console.log(response);
                setEstablishment(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getEstablishment();
    }, [id]);

    if (!establishment) {
        return <p>loading product</p>;
    }

    return (
        <div className="container sectionwrapper">
            <Link className="goback" to="/admin"><FontAwesomeIcon icon={faArrowLeft} /> Go back</Link>
            <h1 className={"pageheading"}>Add <span>Establishment</span></h1>
            <form className="form" style={{ marginTop: "48px" }} onSubmit={handleSubmit(onSubmit)}>
                {updateError && <p>{updateError}</p>}
                <fieldset disabled={submitting}>
                    <div className={"form-group"}>
                        <input
                            name='establishment_name'
                            placeholder='Name'
                            ref={register}
                            defaultValue={establishment.establishment_name}
                        />
                        {errors.establishment_name && <p>{errors.establishment_name.message}</p>}
                    </div>

                    <div className={"form-group"}>
                        <input
                            name='establishment_price'
                            placeholder='Price'
                            defaultValue={establishment.establishment_price}
                            ref={register}
                            type='number'
                        />
                        {errors.establishment_price && <p>{errors.establishment_price.message}</p>}
                    </div>
                    <div className={"form-group"}>
                        <textarea
                            name='establishment_description'
                            placeholder='Description'
                            defaultValue={establishment.establishment_description}
                            ref={register}
                            type='text'
                        />
                        {errors.establishment_description && <p>{errors.establishment_description.message}</p>}
                    </div>
                    <div className={"form-group"}>
                        <input
                            name='establishment_image'
                            placeholder='Image URL'
                            ref={register}
                            defaultValue={establishment.establishment_image}
                            type='text'
                        />
                        {errors.establishment_image && <p>{errors.establishment_image.message}</p>}
                    </div>

                    <div className="form-group">
                        <button className="btn" style={{ width: "100%" }} type='submit'>{submitting ? 'Updating...' : 'Update'}</button>
                    </div>
                </fieldset>
            </form>
            {success ? <p>Listing of {establishment.establishment_name} was updated</p> : null}
        </div>
    );

};

export default EditEstablishment;