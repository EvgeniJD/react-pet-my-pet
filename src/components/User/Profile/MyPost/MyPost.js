import './MyPost.css';
import { Link } from 'react-router-dom';

function MyPost({
    avatar, content, _id
}) {
    return (
        <Link to={`/post/${_id}`}>
            <article className="my-post">
                <img src={avatar} alt="" />
                <p className="my-post-content">
                    {content}
                </p>
        </article>
        </Link>
    )
}

export default MyPost;

