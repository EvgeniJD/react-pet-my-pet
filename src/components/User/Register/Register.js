import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import userService from '../../../services/user';
import AuthContext from '../../../contexts/AuthContext';
import { useContext } from 'react';

import './Register.css';

import TextField from '../TextField';


function Register({
    history
}) {

    const [ , setUserData ] = useContext(AuthContext);

    const yupSchema = Yup.object({
        username: Yup.string()
            .required('Username is required!')
            .max(20, 'Username should be less than 20 characters!'),
        email: Yup.string()
            .email('Email is incorrect!')
            .required('Email is required!'),
        password: Yup.string()
            .required('Password is required!')
            .min(6, 'Password should be at least 6 characters long!'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Password must match!')
            .required('Password confirmation is required!')
    })


    return (
        <Formik
            initialValues={{
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }}

            validationSchema={yupSchema}

            onSubmit={(userData, methods) => {

                userService.register(userData)
                    .then(user => {
                        if (user.errorMessage) {
                           return methods.setFieldError('email', user.errorMessage);
                        }
                        setUserData(user);                        
                    })
                    .catch(e => console.log('Error from onSubmit register user: ', e.message))
            }}
        >
            {formik => (
                <section className="reg-wraper">
                    <article className="reg-form-wrapper">
                        <h1 className="reg-form-heading">Sign up</h1>
                        <Form>
                            <TextField label="Username" name="username" type="text" />
                            <TextField label="Email" name="email" type="email" />
                            <TextField label="Password" name="password" type="password" />
                            <TextField label="Confirm Password" name="confirmPassword" type="password" />
                            <button type="submit" className="confirm-btn reg-btn" >Sign up</button>
                        </Form>
                    </article>
                    <article className="reg-image-wrapper">
                        <img src="/friends.png" alt="" />
                    </article>
                </section>
            )}
        </Formik>
    )
}

export default Register;