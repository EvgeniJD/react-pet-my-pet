import './Post.css';

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
                <button className="post-footer-like">
                    Like {likes}
                </button>
                <button className="post-footer-see-comments">
                    See comments
                </button>
                <button className="post-footer-dislike">
                    {dislikes} Dislike
                </button>
            </footer>
        </article>
    )
}

export default Post;