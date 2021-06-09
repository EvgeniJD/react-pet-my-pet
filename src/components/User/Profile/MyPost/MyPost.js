import './MyPost.css';
import { Link } from 'react-router-dom';

function MyPost({
    avatar, content, username, _id
}) {
    return (
        <Link to={`/post/${_id}`}>
            <article className="my-post">
            <div className="my-post-img-wrapper">
                <img src={avatar} alt="" />
            </div>
            <div className="my-post-username-content-wrapper">
                <h4 className="my-post-username">
                    {username}
                </h4>
                <p className="my-post-content">
                    {content}
                </p>
            </div>
        </article>
        </Link>
    )
}

export default MyPost;

