import { useEffect, useState } from 'react';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import AddEditPost from './AddEditPost';
import postsService from '../../services/posts';
import IsAuth from '../../hoc/IsAuth';

function Posts({ isInAddPostMode, onCancelAddPost }) {
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
                setPosts={setPosts}
            />)}
        </>
    )

}

export default IsAuth(Posts);