import { useEffect, useState, useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import AddEditPost from './AddEditPost';
import postsService from '../../services/posts';
import IsAuth from '../../hoc/IsAuth';

function Posts({ isInAddPostMode, onCancelAddPost }) {
    // const [posts, setPosts] = useFetch(postsService.getAllPosts, []);
    const [posts, setPosts] = useState([]);
    console.log('POSTS: ', posts);

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
                mode='add'
                setPosts={setPosts}
            />}

            {posts?.map(post => <Post
                key={post._id}
                setPosts={setPosts}
                {...post}
            />)}
        </>
    )

}

export default IsAuth(Posts);