import { useParams } from 'react-router-dom';
import useAxios from '../utils/useAxios';
import { useState, useEffect } from 'react';
import SingleItem from '../components/SingleItem';
import { ESTABLISHMENTS_PATH } from '../utils/constants';

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
        <>
            <h1 className={"pageheading"}>Edit Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {updateError && <p>{updateError}</p>}
                <fieldset disabled={submitting}>
                    <div>
                        <input
                            name='establishment_name'
                            placeholder='Name'
                            ref={register}
                            defaultValue={establishment.establishment_name}
                        />
                        {errors.establishment_name && <p>{errors.establishment_name.message}</p>}
                    </div>

                    <div>
                        <input
                            name='establishment_price'
                            placeholder='Price'
                            defaultValue={establishment.establishment_price}
                            ref={register}
                            type='number'
                        />
                        {errors.establishment_price && <p>{errors.establishment_price.message}</p>}
                    </div>
                    <div>
                        <textarea
                            name='establishment_description'
                            placeholder='Description'
                            defaultValue={establishment.establishment_description}
                            ref={register}
                            type='text'
                        />
                        {errors.establishment_description && <p>{errors.establishment_description.message}</p>}
                    </div>
                    <div>
                        <input
                            name='establishment_image'
                            placeholder='Image URL'
                            ref={register}
                            defaultValue={establishment.establishment_image}
                            type='text'
                        />
                        {errors.establishment_image && <p>{errors.establishment_image.message}</p>}
                    </div>

                    <button type='submit'>{submitting ? 'Updating ...' : 'Update'}</button>
                </fieldset>
            </form>
            {success ? <p>Listing of {establishment.establishment_name} was updated</p> : null}
            <SingleItem {...establishment} />

        </>
    );

};

export default EditEstablishment;