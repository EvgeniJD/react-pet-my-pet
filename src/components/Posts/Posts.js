import { useEffect, useState, useContext } from 'react';
import AuthContext from '../../contexts/AuthContext';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import AddEditPost from './AddEditPost';
import postsService from '../../services/posts';
import IsAuth from '../../hoc/IsAuth';
import userService from '../../services/user';

function Posts({ isInAddPostMode, onCancelAddPost }) {

    const [userData, setUserData] = useContext(AuthContext);

    // const [posts, setPosts] = useFetch(postsService.getAllPosts, []);
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        postsService.getAllPosts().then((res) => { setPosts(res) });
    }, [])

    useEffect(() => {
        return function () {
            onCancelAddPost();
        }
    }, [])

    function editPost(postId, currentValue) {
        postsService.editPost(postId, currentValue)
            .then((result) => {
                const updatedPosts = posts.map(post => post._id === postId ? { ...post, ...result } : post);
                return setPosts(updatedPosts);
            })
    }

    function updateUser(objectId, ownerData, endPoint) {
        userService.updateUser(userData._id, { objectId, ownerData }, endPoint)
            .then((updatedArray) => {
                if (updatedArray) {
                    setUserData(oldState => {
                        return { ...oldState, [endPoint]: updatedArray };
                    })
                }
            })
    }

    return (
        <>
            {isInAddPostMode && <AddEditPost
                onCancelHandler={onCancelAddPost}
                setPosts={setPosts}
                mode='add'
            />}

            {posts?.map(post => <Post
                key={post._id}
                {...post}
                editPost={editPost}
                updateUser={updateUser}
                setPosts={setPosts}
            />)}
        </>
    )

}

export default IsAuth(Posts);