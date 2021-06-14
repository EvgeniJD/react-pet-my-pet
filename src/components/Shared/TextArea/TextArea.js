import './TextArea.css';
import TextAreaErrorMessage from './TextAreaErrorMessage';

const TextArea = ({
    name,
    onContentChangeHandlerFromParent,
    value,
    errorMessage,
    showErrorMessage,
    isEmpty
}) => {

    const classes = [
        "add-new-comment-post"
    ]

    if(showErrorMessage) classes.push('invalid');

    function onContentChangeHandler(e) {
        e.target.style.height = ""
        e.target.style.height = e.target.scrollHeight + "px";
    }

    function onBlurTextAreaHandler(e) {
        if(isEmpty(e.target.value)) showErrorMessage = true;
    }

    return (
        <div className="textarea-wrapper">
            <textarea
                onChange={(e) => { onContentChangeHandlerFromParent(e); onContentChangeHandler(e); }}
                onBlur={onBlurTextAreaHandler}
                name={name}
                placeholder="Add Text"
                className={classes.join(' ')}
                value={value}
            />

            {showErrorMessage && <TextAreaErrorMessage>{errorMessage}</TextAreaErrorMessage>}
        </div>

    )
}

export default TextArea;