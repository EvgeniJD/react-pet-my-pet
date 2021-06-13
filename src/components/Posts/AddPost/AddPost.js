import './AddPost.css';
import { useState, useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';

import Button from '../../Shared/Button';
import TextArea from '../../Shared/TextArea';

import postsService from '../../../services/posts';

function AddPost({ onCancelAddPost, setPosts }) {

    const [content, setContent] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [userData] = useContext(AuthContext);

    function checkErrors(content) {
        if (!content) {
            return setShowErrorMessage(true);
        }
        setShowErrorMessage(false);
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if (showErrorMessage) return;

        const post = {
            content,
            owner: userData._id,
            likes: 0,
            dislikes: 0,
            comments: []
        }

        postsService.create(post)
            .then((result) => {
                const populatedResult = {
                    ...result,
                    owner: {
                        _id: result.owner,
                        username: userData.username,
                        avatar: userData.avatar
                    }
                }
                setContent('');
                onCancelAddPost();
               
                setPosts(posts => {
                    const newPosts = posts.slice();
                    newPosts.unshift(populatedResult);
                    return newPosts;
                });
            })


    }

    function onContentChangeHandler(e) {
        checkErrors(e.target.value);
        setContent(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <article className="post-wraper">
                <header className="add-post-header">
                    <div className="post-header-image">
                        <img src={userData.avatar } alt="" />
                    </div>
                    <TextArea
                        name="postContent"
                        onContentChangeHandlerFromParent={onContentChangeHandler}
                        value={content}
                        errorMessage="Post should not be empty!"
                        showErrorMessage={showErrorMessage}
                        checkErrors={checkErrors}
                    />
                </header>
                <footer className="post-footer">
                    <Button type="submit" view="success" newClassName="add-post-btn">Add Post</Button>
                    <Button type="button" onClick={onCancelAddPost} view="negative" newClassName="cancel-btn" >Cancel</Button>
                </footer>
            </article>
        </form>
    )
}

export default AddPost;


