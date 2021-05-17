import './TextField.css';
import { ErrorMessage, useField } from 'formik';

const TextField = ({
    label, ...props
}) => {
    const [ field, meta ] = useField(props);

    // console.log('Field: ', field);
    // console.log('Meta: ', meta);

    return (
        <div className="input-wrapper">
            {/* {console.log('Label: ', label)} */}
            {/* {console.log("Props: ", props)} */}
            <label htmlFor={field.name}>{label}</label>
            <input 
                className={`input-form ${meta.touched && meta.error && 'invalid'}`}
                id={field.name}
                {...field} {...props}
            />

            <ErrorMessage component="div" className="error" name={field.name} />
        </div>
    )
}

export default TextField;