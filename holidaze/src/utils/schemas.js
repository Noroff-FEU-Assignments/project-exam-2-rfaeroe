import * as yup from 'yup';

export const loginSchema = yup.object().shape({
    identifier: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password')
});

export const contactShema = yup.object().shape({
    firstName: yup.string().required("Please enter your first name").min(3, 'First name must be min 3 characters'),
    lastName: yup.string().required("Please enter your last name").min(4, 'Last name must be min 4 characters'),
    email: yup.string().required("Please enter valid email").matches(/^([a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9]+(?:[.-]?[a-zA-Z0-9]+)*\.[a-zA-Z]{2,7})$/, "Only alphabets are allowed for this field "),
    subject: yup.string().required("Please select subject"),
    message: yup.string().required("Please enter your message").min(10, 'Message must be min 10 characters')
});
