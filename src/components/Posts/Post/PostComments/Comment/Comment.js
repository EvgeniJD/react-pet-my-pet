import { useContext, useState } from 'react';
import AuthContext from '../../../../../contexts/AuthContext';
import AddEditComment from '../AddEditComment';
import EditDeletePopUpIcons from '../../../../Shared/EditDeletePopUpIcons';
import commentsService from '../../../../../services/comments';
import Button from '../../../../Shared/Button';

import './Comment.css';

function Comment({
    _id,
    owner,
    content,
    date,
    likes,
    dislikes,
    setComments,
    setPost
}) {

    const [userData, setUserData] = useContext(AuthContext);

    const [isInEditCommentMode, setIsInEditCommentMode] = useState(false);

    function isOwner() {
        return userData._id === owner._id;
    }

    const isUserAlreadyLiked = () => userData.likes.includes(_id);
    const isUserAlreadyDisliked = () => userData.dislikes.includes(_id);

    function toggleEditCommentMode() {
        setIsInEditCommentMode((state) => !state);
    }

    function editComment(id, currentValue) {
        const updateKey = Object.keys(currentValue)[0];

        commentsService.editComment(id, currentValue)
            .then((comment) => {
                console.log('Edited Comment: ', comment);
                setComments((comments) => {
                    return comments.map(currComment => currComment._id === comment._id ? comment : currComment);
                });

                if (updateKey != 'content') {
                    setUserData((user) => {
                        return { ...user, [updateKey]: _id }
                    });
                }
            })
    }


    function deleteCommentHandler() {
        commentsService.deleteComment(_id)
            .then((result) => {
                setComments((comments) => {
                    const index = comments.findIndex((comment) => comment._id === result.deletedCommentId);
                    const newComments = comments.slice();
                    newComments.splice(index, 1);
                    return newComments;
                })

                setPost((post) => {
                    const commentsCopy = post.comments.slice();
                    const index = commentsCopy.findIndex((comment) => comment._id === result.deletedCommentId);
                    commentsCopy.splice(index, 1);
                    return { ...post, comments: commentsCopy };
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
            editComment={editComment}
        />
    }


    return (
        <article className="comment">
            <article className="comment-header">
                <h4 className="comment-header-username">{owner.username}</h4>
                <p className="comment-header-date">
                    {isOwner() && <EditDeletePopUpIcons
                        deleteHandler={deleteCommentHandler}
                        toggleEditMode={toggleEditCommentMode}
                    />}
                    {new Date(date).toLocaleString()}
                </p>

            </article>
            <article className="comment-content-image-wrapper">
                <img src={owner.avatar} alt="" />
                <p className="comment-content">
                    {content}
                </p>
            </article>
            <footer className="comment-footer">
                <Button
                    view="success"
                    newClassName={isUserAlreadyLiked() ? 'disabled comment-like-btn' : 'comment-like-btn'}
                    onClick={() => editComment(_id, { likes })}
                >
                    Like <b>{`${likes}`}</b>
                </Button>
                <Button
                    view="negative"
                    onClick={() => editComment(_id, { dislikes })}
                    newClassName={isUserAlreadyDisliked() ? 'disabled comment-dislike-btn' : 'comment-dislike-btn'}
                >
                    <b>{`${dislikes}`}</b> Dislike
                </Button>
            </footer>
        </article>
    );
}

export default Comment;