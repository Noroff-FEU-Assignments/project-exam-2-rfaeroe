import useAxios from '../utils/useAxios';
import {useState} from 'react';
import Item from '../components/Item';
import {ESTABLISHMENTS_PATH} from '../utils/constants';

import {useForm} from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import { establishmentSchema } from '../utils/schemas';

const AddEstablishment = () => {
    const [establishment, setEstablishment] = useState(null);
    const http = useAxios();

    const [submitting, setSubmitting] = useState(false);
    const [postError, setPostError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { register, handleSubmit, errors} = useForm({
        resolver: yupResolver(establishmentSchema)
    });

    const onSubmit = async (data) => {
        setSubmitting(true);
        setPostError(null);
        console.log(data);
        
        try{
            const response = await http.post(`${ESTABLISHMENTS_PATH}`, data);
            console.log('response', response.data);
            setProduct(response.data);
            setSuccess(true);
        } catch(error) {
            console.log('error', error);
            setPostError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <div className={"container"}>

        </div>
    )

};

export default AddEstablishment;