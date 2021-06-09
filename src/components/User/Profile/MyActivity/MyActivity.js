import './MyActivity.css';
import {Link} from 'react-router-dom';

function MyActivity({
    objectId, message, date
}) {
    return (
        <Link to={`/post/${objectId}`}>
            <article className="my-activity">
            <p className="my-activity-date">{new Date(date).toLocaleString()}</p>
            <p className="my-activity-message">
                {message}
            </p>
        </article>
        </Link>
    )
}

export default MyActivity;