import './MyActivity.css';
import {Link} from 'react-router-dom';

function MyActivity({
    objectId, message, date
}) {


    const classes = ['my-activity'];

    if (message.includes('Created')) {
        classes.push('created');
    } else if (message.includes('Liked')) {
        classes.push('liked');
    } else if (message.includes('Disliked')) {
        classes.push('disliked');
    } else if (message.includes('Commented')) {
        classes.push('commented');
    } else if (message.includes('Deleted')) {
        classes.push('deleted');
    } else if (message.includes('Edited')) {
        classes.push('edited');
    }

    return (
        <Link to={`/post/${objectId}`}>
            <article className={classes.join(' ')}>
            <p className="my-activity-date">{new Date(date).toLocaleString()}</p>
            <p className="my-activity-message">
                {message}
            </p>
        </article>
        </Link>
    )
}

export default MyActivity;