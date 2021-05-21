import useAxios from '../utils/useAxios';
import { useState } from 'react';
import Item from '../components/SingleItem';
import { ESTABLISHMENTS_PATH } from '../utils/constants';

import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { establishmentSchema } from '../utils/schemas';

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

        <div className={"container"}>
            <h1 className={"pageheading"}>Add Product</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                {postError && <p>{postError}</p>}
                <fieldset disabled={submitting}>
                    <div className={"form-group"}>
                        <input
                            name='establishment_name'
                            placeholder='Title'
                            ref={register}

                        />
                        {errors.establishment_name && <p>{errors.establishment_name.message}</p>}
                    </div>

                    <div className={"form-group"}>
                        <input
                            name='establishment_price'
                            placeholder='Price'
                            ref={register}
                            type='number'
                        />
                        {errors.establishment_price && <p>{errors.establishment_price.message}</p>}
                    </div>
                    <div className={"form-group"}>
                        <textarea
                            name='establishment_description'
                            placeholder='Description'
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
                            type='text'
                        />
                        {errors.establishment_image && <p>{errors.establishment_image.message}</p>}
                    </div>

                    <button type='submit'>{submitting ? 'Updating ...' : 'Update'}</button>
                </fieldset>
            </form>
            <div className={"card"}>
                {success ? <p>Listing of {establishment.title} was updated</p> : null}
                <Item {...establishment} />
            </div>


        </div>
    );

};

export default AddEstablishment;