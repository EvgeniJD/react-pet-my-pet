import './AddPost.css';
import { useState } from 'react';

import Button from '../../Shared/Button';
import TextArea from '../../Shared/TextArea';

import postsService from '../../../services/posts';

function AddPost({ onCancelAddPost }) {

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
        onCancelAddPost();
        console.log("Content: ", content);
    }

    function onContentChangeHandler(e) {
        checkErrors(e.target.value);
        setContent(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <article className="post-wraper">
                <header className="add-post-header">
                    <div className="post-header-image">
                        <img src="http://firstcutlab.eu/wp-content/uploads/2020/07/ivan.png" alt="" />
                    </div>
                    <TextArea
                        name="postContent"
                        onContentChangeHandlerFromParent={onContentChangeHandler}
                        value={content}
                        errorMessage="Post should not be empty!"
                        showErrorMessage={showErrorMessage}
                        checkErrors={checkErrors}
                    />
                </header>
                <footer className="post-footer">
                    <Button type="submit" view="success" newClassName="add-post-btn">Add Post</Button>
                    <Button type="button" onClick={onCancelAddPost} view="negative" newClassName="cancel-btn" >Cancel</Button>
                </footer>
            </article>
        </form>
    )
}

export default AddPost;


