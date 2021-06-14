import { useState, useEffect } from 'react';
import commentsService from '../../../../services/comments';
import './PostComments.css';
import Comment from './Comment';
import AddComment from './AddComment';
import Button from '../../../Shared/Button';


function PostComments({ toggleIsCommentsVisible, postId }) {

    const [comments, setComments] = useState([]);
    const [isInAddCommentMode, setIsInAddCommentMode] = useState(false);

    useEffect(() => {
        commentsService.getComments(postId)
            .then((comments) => {
                console.log('Comments: ', comments);
                setComments(comments);
            })
    }, [])

    function changeAddCommentMode() {
        setIsInAddCommentMode((oldValue) => !oldValue);
    }

    return (
        <article className="comments-wrapper">
            {!isInAddCommentMode && <header className="comments-header">
                <Button
                    view="round-bottom blue"
                    onClick={changeAddCommentMode}
                >
                    {comments.length > 0 ? 'Add New Comment' : 'Write First Comment'}
                </Button>
            </header>}
            {isInAddCommentMode && <AddComment
                changeAddCommentMode={changeAddCommentMode}
                postId={postId}
                setComments={setComments}
            />}
            {comments && comments.map(comment => <Comment key={comment._id} {...comment} />)}
            <footer className="comments-footer">
                <Button view="negative" onClick={toggleIsCommentsVisible}>Hide Comments</Button>
            </footer>
        </article>
    );
}

export default PostComments;