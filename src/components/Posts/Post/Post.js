import { useState, useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import './Post.css';
import Button from '../../Shared/Button';
import EditDeletePopUpIcons from '../../Shared/EditDeletePopUpIcons';
import PostComments from './PostComments';
import AddEditPost from '../AddEditPost';
import postsService from '../../../services/posts';

function Post({
    owner,
    date,
    content,
    likes,
    dislikes,
    editPost,
    _id,
    setPosts
}) {

    const [userData] = useContext(AuthContext);

    const [isCommentsVisible, setIsCommentsVisible] = useState(false);
    const [isInEditPostMode, setIsInEditPostMode] = useState(false);

    const isOwner = () => userData._id === owner._id;

    const isUserAlreadyLiked = () => {
        return userData.likes.includes(_id);
    }

    const isUserAlreadyDisliked = () => {
        return userData.dislikes.includes(_id);
    }

    const toggleIsCommentsVisible = () => {
        setIsCommentsVisible((oldState) => !oldState);
    };

    const toggleEditPostMode = () => setIsInEditPostMode(oldValue => !oldValue);

    const deletePostHandler = () => {
        postsService.deletePost(_id)
            .then((result) => {
                console.log('Deleted post result: ', result);
                setPosts((posts) => {
                    const index = posts.findIndex((post) => post._id === result.deletedPostId);
                    const newPosts = posts.slice();
                    newPosts.splice(index, 1);
                    return newPosts;
                });
            })
    }


    if (isInEditPostMode) {
        return (
            <AddEditPost
                onCancelHandler={toggleEditPostMode}
                setPosts={setPosts}
                mode='edit'
                postId={_id}
                initialContent={content}
            />
        );
    }

    return (
        <>
            <article className="post-wraper">
                <header className="post-header">
                    <div className="post-header-image">
                        <img src={owner.avatar} alt="profile-pic" />
                    </div>
                    <div className="post-header-username-date-wrapper">
                        <h3 className="post-header-username">{owner.username}</h3>
                        <p className="post-header-date">
                            {isOwner() && <EditDeletePopUpIcons
                                deleteHandler={deletePostHandler}
                                toggleEditMode={toggleEditPostMode}
                            />}
                            {new Date(date).toLocaleString()}
                        </p>
                    </div>
                    <p className="post-header-content">{content}</p>
                </header>
                <footer className="post-footer">
                    <Button
                        view="success"
                        newClassName={isUserAlreadyLiked() ? 'disabled post-footer-like' : 'post-footer-like'}
                        onClick={() => editPost(_id, { likes })}
                    >
                        {`Like ${likes}`}
                    </Button>
                    <Button
                        view={isCommentsVisible ? "round-top gray" : "round-top blue"}
                        newClassName="post-footer-see-comments"
                        onClick={toggleIsCommentsVisible}
                    >
                        {isCommentsVisible ? 'Hide comments' : 'See comments'}
                    </Button>
                    <Button
                        view="negative"
                        newClassName={isUserAlreadyDisliked() ? 'disabled post-footer-dislike' : 'post-footer-dislike'}
                        onClick={() => editPost(_id, { dislikes })}
                    >
                        {`${dislikes} Dislike`}
                    </Button>
                </footer>
            </article>

            {isCommentsVisible && <PostComments toggleIsCommentsVisible={toggleIsCommentsVisible} postId={_id} />}
        </>
    )
}

export default Post;