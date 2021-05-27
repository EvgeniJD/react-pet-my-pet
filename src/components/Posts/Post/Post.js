import './Post.css';
import Button from '../../Shared/Button';

function Post({
    avatar,
    content,
    likes,
    dislikes
}) {
    return (
        <article className="post-wraper">
            <header className="post-header">
                <div className="post-header-image">
                    <img src={avatar} alt="" />
                </div>
                <p className="post-header-content">{content}</p>
            </header>
            <footer className="post-footer">
                <Button view="success" newClassName="post-footer-like">{`Like ${likes}`}</Button>
                <Button view="common" newClassName="post-footer-see-comments">See comments</Button>
                <Button view="negative" newClassName="post-footer-dislike">{`${dislikes} Dislike`}</Button>
            </footer>
        </article>
    )
}

export default Post;