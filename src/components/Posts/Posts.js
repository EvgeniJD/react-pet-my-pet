import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import AddPost from './AddPost';
import postsService from '../../services/posts';
import IsAuth from '../../hoc/IsAuth';
import userService from '../../services/user';

function Posts({ isInAddPostMode, onCancelAddPost }) {

    const [userData, setUserData] = useContext(AuthContext);

    // const [posts, setPosts] = useFetch(postsService.getAll, []);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        postsService.getAll().then((res) => { console.log('Posts: ', res); setPosts(res) });
    }, [])

    useEffect(() => {
        return function () {
            onCancelAddPost();
        }
    }, [])

    function updatePost(postId, currentValue) {
        postsService.updatePost(postId, currentValue)
            .then((result) => {
                const updatedPosts = posts.map(post => post._id === postId ? { ...post, ...result } : post);
                return setPosts(updatedPosts);
            })
    }

    function updateUserLikes(objectId) {
        userService.updateUserLikes(userData._id, { objectId })
            .then((result) => {
                if (result.objectId) {
                    setUserData(oldState => {
                        const updatedUserLikes = oldState.likes.concat(result.objectId);
                        return { ...oldState, likes: updatedUserLikes };
                    })
                }
            })
    }

    return (
        <>
            {isInAddPostMode && <AddPost onCancelAddPost={onCancelAddPost} setPosts={setPosts} />}
            {posts?.map(post => <Post
                key={post._id}
                {...post}
                updatePost={updatePost}
                updateUserLikes={updateUserLikes}
            />)}
        </>
    )

}

export default IsAuth(Posts);