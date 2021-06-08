import { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import userService from '../../../services/user';

import '../Register/Register.css';

import TextField from '../TextField';


function Login({
    history
}) {

    const [ , setUserData ] = useContext(AuthContext);

    const validate = Yup.object({
        email: Yup.string()
            .required('Email is required!')
            .email('Invalid email!'),
        password: Yup.string()
            .required('Password is required!')
            .min(6, 'Password should be at least 6 characters long!'),
    })

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}

            validationSchema={validate}

            onSubmit={values => {
                userService.login(values)
                    .then(data => {
                        setUserData(data);
                    })
                    .catch(e => console.log('Login error: ', e.message))
            }}
        >
            {formik => (
                <section className="reg-wraper">
                    <article className="reg-form-wrapper">
                        <h1 className="reg-form-heading">Sign in</h1>
                        <Form>
                            <TextField label="email" name="email" type="email" />
                            <TextField label="Password" name="password" type="password" />
                            <button className="confirm-btn reg-btn" type="submit">Sign in</button>
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

export default Login;