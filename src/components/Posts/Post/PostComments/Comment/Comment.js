import { func } from 'assert-plus';
import { span } from 'prelude-ls';
import { useContext } from 'react';
import AuthContext from '../../../../../contexts/AuthContext';

import './Comment.css';

function Comment({
    owner,
    content,
    date
}) {

    const [userData] = useContext(AuthContext);

    function isOwner() {
        return userData._id === owner._id;
    }

    return (
        <article className="comment">
            <article className="comment-header">
                <h4 className="comment-header-username">{owner.username}</h4>
                <p className="comment-header-date">{new Date(date).toLocaleString()}</p>
                {isOwner() && <span title="Delete Comment"><i className="comment-icon far fa-trash-alt"></i></span>}
                {isOwner() && <span title="Edit Comment"><i className="comment-icon fas fa-pencil-alt"></i></span>}
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