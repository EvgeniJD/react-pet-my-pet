// import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import AddPost from './AddPost';
import postsService from '../../services/posts';

function Posts({ isInAddPostMode, onCancelAddPost }) {

    // const [ posts, setPosts ] = useState([]);

    const [posts] = useFetch(postsService.getAll, []);
    // console.log('Posts is: ', posts);

    // useEffect(() => {
    //     postsService.getAll()
    //         .then(posts => {
    //             setPosts(posts)
    //         })
    //         .catch(e => console.log("Posts Error Handler: ", e.message));
    // }, [])

    return (
        <>
            {isInAddPostMode && <AddPost onCancelAddPost={onCancelAddPost} />}
            {posts.map(post => <Post key={post._id}{...post} />)}
        </>
    )

}

export default Posts;