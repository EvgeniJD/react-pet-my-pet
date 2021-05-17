import { Formik, Form } from 'formik';
import * as Yup from 'yup';

import '../Register/Register.css';

import TextField from '../TextField';


function Login() {

    const validate = Yup.object({
        username: Yup.string()
            .required('Username is required!')
            .max(20, 'Username should be less than 20 characters!'),
        password: Yup.string()
            .required('Password is required!')
            .min(6, 'Password should be at least 6 characters long!'),
    })

    return (
        <Formik
            initialValues={{
                username: '',
                password: '',
            }}

            validationSchema={validate}

            onSubmit={values => {
                console.log(values);
            }}
        >
            {formik => (
                <section className="reg-wraper">
                    <article className="reg-form-wrapper">
                        <h1 className="reg-form-heading">Sign in</h1>
                        <Form>
                            <TextField label="Username" name="username" type="text" />
                            <TextField label="Password" name="password" type="password" />
                            <button className="confirm-btn reg-btn" >Sign in</button>
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