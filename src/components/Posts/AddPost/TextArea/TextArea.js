import './TextArea.css';
import { ErrorMessage, useField } from 'formik';

const TextArea = ({
    ...props
}) => {

    const [field, meta] = useField(props);

    // console.log('Field: ', field);
    // console.log('Meta: ', meta);

    return (<>
        {/* {console.log('Label: ', label)} */}
        {/* {console.log("Props: ", props)} */}
        <textarea name={field.name}
            className={`${meta.touched && meta.error && 'invalid'}`}
            {...field} {...props}
        />

        <ErrorMessage component="div" className="error" name={field.name} />
    </>
    )
}

export default TextArea;