import './AddComment.css';
import { useState, useContext } from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import commentsService from '../../../../../services/comments';

import Button from '../../../../Shared/Button';
import TextArea from '../../../../Shared/TextArea';

function AddComment({
    changeAddCommentMode,
    postId,
    setComments
}) {

    const [userData] = useContext(AuthContext);

    const [content, setContent] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    function isEmpty(content) {
        if (!content) {
            setShowErrorMessage(true);
            return true;
        }
        setShowErrorMessage(false);
        return false;
    }

    function onContentChangeHandler(e) {
        isEmpty(e.target.value);
        setContent(e.target.value);
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if (isEmpty(content)) return;

        const comment = {
            content,
            likes: 0,
            dislikes: 0,
            owner: userData._id,
            parentPost: postId
        }

        commentsService.createComment(comment)
            .then((createdComment) => {
                console.log('Comment Is Created', createdComment);
                setComments((state) => {
                    state.unshift(createdComment);
                    return state;
                })
                setContent('');
                changeAddCommentMode();
            })
    }

    return (
        <form onSubmit={onSubmitHandler} className="add-comment-wrapper">
            <header className="add-comment-header">
                <article className="add-comment-image-wrapper">
                    <img src={userData.avatar} alt="" />
                </article>
                <TextArea
                    name="commentContent"
                    onContentChangeHandlerFromParent={onContentChangeHandler}
                    value={content}
                    errorMessage="Comment should not be empty!"
                    showErrorMessage={showErrorMessage}
                    isEmpty={isEmpty}
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