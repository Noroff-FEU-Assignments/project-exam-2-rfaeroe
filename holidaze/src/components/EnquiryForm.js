import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enquiriesSchema } from '../utils/schemas';
import useAxios from '../utils/useAxios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';
import {useFormik} from 'formik';
import * as yup from 'yup'; 


const EnquiryForm = () => {
    const [, setEnquiry] = useState(null);
    const [establishment, setEstablishment] = useState([]);
    const { id } = useParams();
    const http = useAxios();

    const [submitting, setSubmitting] = useState(false);
    const [updateError, setUpdateError] = useState(null);

    const [success, setSuccess] = useState(null);

    const { handleChange, handleSubmit, values, touched, errors, handleBlur } = useFormik({
        initialValues: {
            name: "",
            date_to: "",
            date_from: "",
            adults: "",
            children: "",
        },
        enquirySchema: yup.object().shape({
            name: yup.string().required("Please choose establishment"),
            date_to: yup.date().required("Please choose end date"),
            date_from: yup.date().required("Please choose arrival date"),
            adults: yup.number().required("Please select subject"),
            children: yup.number().required("Please enter your message")
        }),
        onSubmit: async (data) => {
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
        }
    });

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

            <form className='form' onSubmit={handleSubmit}>
                {updateError && <p>{updateError}</p>}
                <fieldset className='row' disabled={submitting}>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='name'
                            placeholder='Name'
                            onChange={handleChange}
                            defaultValue={establishment.establishment_name}
                            
                        />
                        {errors.name && <p>{errors.name.message}</p>}
                    </div>

                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='date_from'
                            placeholder='Date from'
                            value={values.date_from}
                            onChange={handleChange}
                            type='date'
                        />
                        {errors.date_from && <p>{errors.date_from.message}</p>}
                    </div>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='date_to'
                            placeholder='Date to'
                            value={values.date_to}
                            onChange={handleChange}
                            type='date'
                        />
                        {errors.date_to && <p>{errors.date_to.message}</p>}
                    </div>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='children'
                            placeholder='Children'
                            value={values.children}
                            onChange={handleChange}
                            type='number'
                        />
                        {errors.children && <p>{errors.children.message}</p>}
                    </div>
                    <div className='form-group col-d-12 col-m-12'>
                        <input
                            name='adults'
                            placeholder='Adults'
                            onChange={handleChange}
                            value={values.adults}
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
