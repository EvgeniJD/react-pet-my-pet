import { useState, useContext, useEffect } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import Button from '../../Shared/Button';
import EditDeletePopUpIcons from '../../Shared/EditDeletePopUpIcons';
import PostComments from './PostComments';
import AddEditPost from '../AddEditPost';
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
                .then((result) => setPost(result));
        }
    }, [])

    const [isCommentsVisible, setIsCommentsVisible] = useState(isInSinglePostMode ? true : false);
    const [isInEditPostMode, setIsInEditPostMode] = useState(false);

    console.log('Post: ', post);
    console.log('UserData: ', userData)

    const isOwner = () => userData._id === post.owner._id;

    const isUserAlreadyLiked = () => userData.likes.includes(post._id);

    const isUserAlreadyDisliked = () => userData.dislikes.includes(post._id);

    const toggleIsCommentsVisible = () => setIsCommentsVisible((oldState) => !oldState);

    const toggleEditPostMode = () => setIsInEditPostMode(oldValue => !oldValue);

    const editPost = (postId, currentValue) => {
        postsService.editPost(postId, currentValue)
            .then((result) => {
                const updatedKey = Object.keys(result)[0];
                if (updatedKey === 'likes' || updatedKey === 'dislikes') {
                    setUserData((data) => {
                        data[updatedKey].push(postId);
                        return data;
                    });
                }
               
                setPost((post) => {
                    const updatedPost = {...post, ...result};
                    return updatedPost;
                })
            })
    }

    const deletePostHandler = () => {
        const currentPath = match.path;

        postsService.deletePost(post._id)
            .then((result) => {

                if(currentPath === '/') {
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


    if (isInEditPostMode) {
        return (
            <AddEditPost
                onCancelHandler={toggleEditPostMode}
                mode='edit'
                editPost={editPost}
                postId={post._id}
                initialContent={post.content}
            />
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
                            onClick={() => editPost(post._id, { likes: post.likes })}
                        >
                            Like <b>{`${post.likes}`}</b>
                        </Button>
                        <Button
                            view={isCommentsVisible ? "round-top gray" : "round-top blue"}
                            newClassName="post-footer-see-comments"
                            onClick={toggleIsCommentsVisible}
                        >
                            {isCommentsVisible ? 'Hide comments' : post.comments.length > 0 ? 'See comments' : 'Write first comment'}
                        </Button>
                        <Button
                            view="negative"
                            newClassName={isUserAlreadyDisliked() ? 'disabled post-footer-dislike' : 'post-footer-dislike'}
                            onClick={() => editPost(post._id, { dislikes: post.dislikes })}
                        >
                            <b>{`${post.dislikes}`}</b> Dislike
                        </Button>
                    </footer>
                </article>

                {isCommentsVisible && <PostComments 
                toggleIsCommentsVisible={toggleIsCommentsVisible} 
                postId={post._id} 
                setPost={setPost}/>}
            </>
        )
    } else {
        return null;
    }
}

export default Post;