import { useContext, useState } from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import AddEditComment from '../AddEditComment';
import commentsService from '../../../../../services/comments';

import './Comment.css';
import { comment } from 'postcss-safe-parser/node_modules/postcss';

function Comment({
    _id,
    owner,
    content,
    date,
    setComments
}) {

    const [userData] = useContext(AuthContext);

    const [isInEditCommentMode, setIsInEditCommentMode] = useState(false);

    function isOwner() {
        return userData._id === owner._id;
    }

    function toggleEditCommentMode() {
        setIsInEditCommentMode((state) => !state);
    }

    function deleteCommentHandler() {
        commentsService.deleteComment(_id)
            .then((result) => {
                setComments((comments) => {
                    const index = comments.findIndex((comment) => comment._id === result.deletedCommentId);
                    const commentsCopy = comments.slice();
                    commentsCopy.splice(index, 1);
                    return commentsCopy;
                })
            })
    }

    if (isInEditCommentMode) {
        return <AddEditComment
            onCancelBtnClick={toggleEditCommentMode}
            id={_id}
            setComments={setComments}
            mode="edit"
            initialContent={content}
        />
    }


    return (
        <article className="comment">
            <article className="comment-header">
                <h4 className="comment-header-username">{owner.username}</h4>
                <p className="comment-header-date">
                    {isOwner() && <span
                        title="Delete Comment"
                        onClick={deleteCommentHandler}
                    >
                        <i className="comment-icon far fa-trash-alt"></i>
                    </span>}
                    {isOwner() && <span
                        title="Edit Comment"
                        onClick={toggleEditCommentMode}
                    >
                        <i className="comment-icon fas fa-pencil-alt">
                        </i></span>}
                    {new Date(date).toLocaleString()}
                </p>

            </article>
            <article className="comment-content-image-wrapper">
                <img src={owner.avatar} alt="" />
                <p className="comment-content">
                    {content}
                </p>
            </article>
        </article>
    );
}

export default Comment;