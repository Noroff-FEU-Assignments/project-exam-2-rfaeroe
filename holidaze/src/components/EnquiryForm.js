import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enquiriesSchema } from '../utils/schemas';
import useAxios from '../utils/useAxios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';


const EnquiryForm = () => {
    const [, setEnquiry] = useState(null);
    const [establishment, setEstablishment] = useState([]);
    const { id } = useParams();
    const http = useAxios();

    const [submitting, setSubmitting] = useState(false);
    const [updateError, setUpdateError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(enquiriesSchema),
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        setUpdateError(null);
        try {
            const response = await http.post(`${BASE_URL}/enquiries`, data);
            setEnquiry(response.data);
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

        <div className={""}>
            <h1 className={"pageheading"}>Book {establishment.establishment_name}</h1>

            <form className='form' onSubmit={handleSubmit(onSubmit)}>
                {updateError && <p>{updateError}</p>}
                <fieldset className='row' disabled={submitting}>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='name'
                            placeholder='Name'
                            ref={register}
                            defaultValue={establishment.establishment_name}
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='date_from'
                            placeholder='Date from'
                            ref={register}
                            type='date'
                        />
                        {errors.date_from && <p>{errors.date_from.message}</p>}
                    </div>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='date_to'
                            placeholder='Date to'
                            ref={register}
                            type='date'
                        />
                        {errors.date_to && <p>{errors.date_to.message}</p>}
                    </div>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='children'
                            placeholder='Children'
                            ref={register}
                            type='number'
                        />
                        {errors.children && <p>{errors.children.message}</p>}
                    </div>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='adults'
                            placeholder='Adults'
                            ref={register}
                            type='number'
                        />
                        {errors.adults && <p>{errors.adults.message}</p>}
                    </div>
                    <div className="form-group col-d-12">
                        <button className='btn' type='submit'>{submitting ? 'Sending ...' : 'Send'}</button>
                    </div>
                </fieldset>
            </form>
            {success ? <p>Booking enquiry for {establishment.establishment_name} was sent</p> : null}
        </div>
    );
};

export default EnquiryForm;
