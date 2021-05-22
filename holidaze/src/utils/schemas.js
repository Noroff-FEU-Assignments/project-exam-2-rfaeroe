import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    identifier: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password')
});

export const contactSchema = yup.object().shape({
    sent_by_name: yup.string().required("Please enter your first name").min(3, 'First name must be min 3 characters'),
    sent_by_mail: yup.string().required("Please enter valid email").matches(/^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/, "Only alphabets are allowed for this field "),
    subject: yup.string().required("Please select subject"),
    message: yup.string().required("Please enter your message").min(10, 'Message must be min 10 characters')
});


export const enquiriesSchema = yup.object().shape({
    name: yup.string().required("Please choose establishment"),
    establishment_name: yup.string().required("Please choose establishment"),
    date_to: yup.date().required("Please choose end date"),
    date_from: yup.date().required("Please choose arrival date"),
    adults: yup.number().required("Please select subject"),
    children: yup.number().required("Please enter your message")
});


export const establishmentSchema = yup.object().shape({
    establishment_name: yup.string().required('Please provide name for establishment'),
    establishment_price: yup.number().required('Please provide price for rent'),
    establishment_description: yup.string().required('Please provide a description'),
    establishment_image: yup.string().required('Please provide an image Url'),
});