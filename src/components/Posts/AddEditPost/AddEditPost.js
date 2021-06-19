import './AddEditPost.css';
import { useState, useContext } from 'react';

import AuthContext from '../../../contexts/AuthContext';

import Button from '../../Shared/Button';
import TextArea from '../../Shared/TextArea';

import postsService from '../../../services/posts';

function AddEditPost({ onCancelHandler, mode, postId, initialContent, editPost, setPosts }) {

    const [content, setContent] = useState(mode === 'add' ? '' : initialContent);
    const [showErrorMessage, setShowErrorMessage] = useState(false);

    const [userData] = useContext(AuthContext);

    function isEmpty(content) {
        if (!content) {
            setShowErrorMessage(true);
            return true;
        }
        setShowErrorMessage(false);
        return false;
    }

    function onSubmitHandler(e) {
        e.preventDefault();
        if (isEmpty(content)) return;

        if (mode === 'add') {
            const post = {
                content,
                owner: userData._id,
                likes: 0,
                dislikes: 0,
                comments: []
            }

            postsService.createPost(post)
                .then((createdPost) => {

                    onCancelHandler();

                    setPosts(posts => {
                        const newPosts = posts.slice();
                        newPosts.unshift(createdPost);
                        return newPosts;
                    });

                })
        } else if (mode === 'edit') {
            if (content === initialContent) return;
            onCancelHandler();
            return editPost(postId, { content });
        }
    }

    function onContentChangeHandler(e) {
        isEmpty(e.target.value);
        setContent(e.target.value);
    }

    return (
        <form onSubmit={onSubmitHandler}>
            <article className="post-wraper">
                <header className="add-post-header">
                    <div className="post-header-image">
                        <img src={userData.avatar} alt="" />
                    </div>
                    <TextArea
                        name="postContent"
                        onContentChangeHandlerFromParent={onContentChangeHandler}
                        value={content}
                        errorMessage="Post should not be empty!"
                        showErrorMessage={showErrorMessage}
                        isEmpty={isEmpty}
                    />
                </header>
                <footer className="post-footer">
                    <Button type="submit" view="success" newClassName="add-post-btn">{mode === 'add' ? 'Add' : 'Edit'}</Button>
                    <Button type="button" onClick={onCancelHandler} view="negative" newClassName="cancel-btn" >Cancel</Button>
                </footer>
            </article>
        </form>
    )
}

export default AddEditPost;


