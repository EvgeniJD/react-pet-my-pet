import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import AddPost from './AddPost';
import postsService from '../../services/posts';
import IsAuth from '../../hoc/IsAuth';

function Posts({ isInAddPostMode, onCancelAddPost }) {

    // const [posts, setPosts] = useFetch(postsService.getAll, []);
    const [posts, setPosts] = useState([]); 
    useEffect(() => {
        postsService.getAll().then((res) => setPosts(res));
    }, [])

    useEffect(() => {
        return function () {
            onCancelAddPost();
        }
    }, [])

    function updatePost(postId, currentValue) {
        postsService.updatePost(postId, currentValue)
            .then((result) => {
                const updatedPosts = posts.map(post => post._id === postId ? {...post, ...result} : post);
                return setPosts(updatedPosts);
            })
    }

    return (
        <>
            {isInAddPostMode && <AddPost onCancelAddPost={onCancelAddPost} />}
            {posts?.map(post => <Post key={post._id}{...post} updatePost={updatePost} />)}
        </>
    )

}

export default IsAuth(Posts);