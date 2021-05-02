import './Post.css';

function Post({
    avatar, 
    comment
}) {
    return (
        <article className="post-wraper">
            <header className="post-header">
                <div className="post-header-image">
                    <img src={ avatar } alt="" />
                </div>
                <p className="post-header-comment">{ comment }</p>
            </header>
            <footer className="post-footer">
                <button className="post-footer-like">
                    Like
                </button>
                <button className="post-footer-see-comments">
                    See comments
                </button>
                <button className="post-footer-dislike">
                    Dislike
                </button>
            </footer>
        </article>
    )
}

export default Post;