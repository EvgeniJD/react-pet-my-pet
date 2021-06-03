import './AddComment.css';
import { useState } from 'react';

import Button from '../../../../Shared/Button';
import TextArea from '../../../../Shared/TextArea';

function AddComment({ changeAddCommentMode }) {

    const [ content, setContent ] = useState('');
    const [ showErrorMessage, setShowErrorMessage ] = useState(false);

    function checkErrors(content) {
        if(!content) {
            setShowErrorMessage(true);
            return true;
        }
        setShowErrorMessage(false);
        return false;
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if(checkErrors(content)) return;
        setContent('');
        changeAddCommentMode();
        console.log("Content: ", content);
    }

    function onContentChangeHandler(e) {
        checkErrors(e.target.value);
        setContent(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler} className="add-comment-wrapper">
            <header className="add-comment-header">
                <article className="add-comment-image-wrapper">
                    <img src="https://consento.bg/wp-content/uploads/2018/03/Evgeni-Mekov1.jpg" alt="" />
                </article>
                <TextArea
                    name="commentContent"
                    onContentChangeHandlerFromParent={onContentChangeHandler}
                    value={content}
                    errorMessage="Comment should not be empty!"
                    showErrorMessage={showErrorMessage}
                    checkErrors={checkErrors}
                />
            </header>
            <footer className="add-comment-footer">
                <Button view="success" type="submit">Add</Button>
                <Button view="negative" type="button" onClick={changeAddCommentMode}>Cancel</Button>
            </footer>
        </form>
    )

}

export default AddComment;