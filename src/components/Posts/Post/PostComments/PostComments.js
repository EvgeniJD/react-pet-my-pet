import { useState } from 'react';
import './PostComments.css';
import Comment from './Comment';
import AddComment from './AddComment';
import Button from '../../../Shared/Button';


function PostComments({ toggleIsCommentsVisible }) {

    // const [ comments, setComments ] = useState([]);
    const comments = [
        '1', '2', '3', '4'
    ]

    const [isInAddCommentMode, setIsInAddCommentMode] = useState(false);
    
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
                    Add New Comment
                    </Button>
            </header>}
            {isInAddCommentMode && <AddComment changeAddCommentMode={changeAddCommentMode} />}
            {comments.map(comment => <Comment key={comment} />)}
            <footer className="comments-footer">
                <Button view="negative" onClick={toggleIsCommentsVisible}>Hide Comments</Button>
            </footer>
        </article>
    );
}

export default PostComments;