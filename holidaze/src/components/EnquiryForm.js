import {useState, useEffect} from 'react'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { enquiriesSchema } from '../utils/schemas';

import axios from 'axios';
import { BASE_URL, ESTABLISHMENTS_PATH } from '../utils/constants';


const EnquiryForm = () => {
    const [establishments, setEstablishments] = useState([])
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [query, setQuery] = useState(true);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(enquiriesSchema),
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setSubmitError(null);

   
        try {
            const response = await axios.post(`${BASE_URL}/enquiries`, data);
            console.log('response', response.data);
        } catch (error) {
            console.log('error', error);
            setSubmitError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        const getEstablishments = async ()=>{
            try {
                const response = await axios.get(`${BASE_URL}${ESTABLISHMENTS_PATH}`)
                setEstablishments(response.data);
            }
            catch (e){
            }
            finally{

            }
        }
        getEstablishments()
    }, [query]);



    console.log(errors);
    return (
        <div className={"sectionwrapper"}>
            <div className={"form-wrapper"}>
                <form className='form col-d-6' onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group'>
                    <select name="name">
                    {errors.name && <p>{errors.name.message}</p>}
                        {establishments.map((est)=>{
                            return(
                            <option name="establishment_name" value={est.establishment_name}>{est.establishment_name}</option>
                            )
                        })}
                    </select>
   
                    </div>
                    <div className='form-group'>
                        <input name="date_from" placeholder='Date from' ref={register} type='date' />
                        {errors.date_from && <p>{errors.date_from.message}</p>}
                    </div>
        
                    <div className='form-group'>
                        <input name="date_to" placeholder='Date to' ref={register} type='date' />
                        {errors.date_to && <p>{errors.date_to.message}</p>}
                    </div>

                    <div className='form-group'>
                        <input name="children" placeholder='Children' ref={register} type='number' />
                        {errors.children && <p>{errors.children.message}</p>}
                    </div>

                    <div className='form-group'>
                        <input name="adults" placeholder='Adults' ref={register} type='number' />
                        {errors.adults && <p>{errors.adults.message}</p>}
                    </div>
                    <button className={"button contact-button"}>Send</button>
                </form>
            </div>
        </div>


    );
};

export default EnquiryForm;

