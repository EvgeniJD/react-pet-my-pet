import { useState, useContext, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Button from '../../Shared/Button';
import EditDeletePopUpIcons from '../../Shared/EditDeletePopUpIcons';
import PostComments from './PostComments';
import AddEditPost from '../AddEditPost';
import ErrorPage from '../../Shared/ErrorPage';

import postsService from '../../../services/posts';
import './Post.css';

function Post(props) {
    const [userData, setUserData] = useContext(AuthContext);
    const [post, setPost] = useState(props);

    const history = useHistory();
    const match = useRouteMatch();

    const isInSinglePostMode = !post.owner;
    useEffect(() => {
        if (isInSinglePostMode) {
            console.log('GOING TO FETCH POST !');
            const postId = match.params.postId;
            postsService.getPost(postId)
                .then((result) => {
                    return setPost(result)
                });
        }
    }, [])


    const [isCommentsVisible, setIsCommentsVisible] = useState(isInSinglePostMode ? true : false);
    const [isInEditPostMode, setIsInEditPostMode] = useState(false);

    console.log('Post: ', post);
    console.log('UserData: ', userData)

    const isOwner = () => post.owner._id === userData._id;

    const isUserAlreadyLiked = () => post.likes.includes(userData._id);

    const isUserAlreadyDisliked = () => post.dislikes.includes(userData._id);

    const toggleIsCommentsVisible = () => setIsCommentsVisible((oldState) => !oldState);

    const toggleEditPostMode = () => setIsInEditPostMode(oldValue => !oldValue);

    const editPost = (postId, currentValue) => {
        postsService.editPost(postId, currentValue)
            .then((result) => {
                setPost((post) => {
                    return { ...post, ...result };
                })
            })
    }

    const deletePostHandler = () => {
        const currentPath = match.path;

        postsService.deletePost(post._id)
            .then((result) => {

                if (currentPath === '/') {
                    props.setPosts((posts) => {
                        const index = posts.findIndex((post) => post._id === result.deletedPostId);
                        const newPosts = posts.slice();
                        newPosts.splice(index, 1);
                        return newPosts;
                    });
                } else {
                    history.push('/');
                }
            })
    }

    if (post.errorMessage) return <ErrorPage />

    if (isInEditPostMode) {
        return (
            <>
                <AddEditPost
                    onCancelHandler={toggleEditPostMode}
                    mode='edit'
                    editPost={editPost}
                    postId={post._id}
                    initialContent={post.content}
                />
                {isCommentsVisible && <PostComments
                    toggleIsCommentsVisible={toggleIsCommentsVisible}
                    postId={post._id}
                    setPost={setPost} />}
            </>
        );
    }

    if (post && post.owner) {
        return (
            <>
                <article className="post-wraper">
                    <header className="post-header">
                        <div className="post-header-image">
                            <img src={post.owner.avatar} alt="profile-pic" />
                        </div>
                        <div className="post-header-username-date-wrapper">
                            <h3 className="post-header-username">{post.owner.username}</h3>
                            <p className="post-header-date">
                                {isOwner() && <EditDeletePopUpIcons
                                    deleteHandler={deletePostHandler}
                                    toggleEditMode={toggleEditPostMode}
                                />}
                                {new Date(post.date).toLocaleString()}
                            </p>
                        </div>
                        <p className="post-header-content">{post.content}</p>
                    </header>
                    <footer className="post-footer">
                        <Button
                            view="success"
                            newClassName={isUserAlreadyLiked() ? 'disabled post-footer-like' : 'post-footer-like'}
                            onClick={() => editPost(post._id, { likes: userData._id })}
                        >
                            Like <b>{`${post.likes.length}`}</b>
                        </Button>
                        <Button
                            view={isCommentsVisible ? "round-top gray" : "round-top blue"}
                            newClassName="post-footer-see-comments"
                            onClick={toggleIsCommentsVisible}
                        >
                            {isCommentsVisible ? 'Hide comments' : post.comments.length > 0 ? 'See comments' : 'Write first comment'}
                        </Button>
                        <Button
                            view={isCommentsVisible ? "round-top gray" : "round-top blue"}
                            newClassName="post-footer-see-comments-small"
                            onClick={toggleIsCommentsVisible}
                        >
                            {isCommentsVisible ? 'Hide' : 'Comments'}
                        </Button>
                        <Button
                            view="negative"
                            newClassName={isUserAlreadyDisliked() ? 'disabled post-footer-dislike' : 'post-footer-dislike'}
                            onClick={() => editPost(post._id, { dislikes: userData._id })}
                        >
                            <b>{`${post.dislikes.length}`}</b> Dislike
                        </Button>
                    </footer>
                </article>

                {isCommentsVisible && <PostComments
                    toggleIsCommentsVisible={toggleIsCommentsVisible}
                    postId={post._id}
                    setPost={setPost} />}
            </>
        )
    } else {
        return null;
    }
}

export default Post;