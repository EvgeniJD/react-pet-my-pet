import './TextField.css';
import { ErrorMessage, useField } from 'formik';

const TextField = ({
    label, ...props
}) => {
    const [ field, meta ] = useField(props);

    return (
        <div className="input-wrapper">
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