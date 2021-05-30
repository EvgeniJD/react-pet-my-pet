// import { useState, useEffect } from 'react';
import useFetch from '../../hooks/useFetch';
import Post from './Post';
import postsService from '../../services/posts';

function Posts() {

    // const [ posts, setPosts ] = useState([]);

    const [ posts ] = useFetch(postsService.getAll, []);

    // useEffect(() => {
    //     postsService.getAll()
    //         .then(posts => {
    //             setPosts(posts)
    //         })
    //         .catch(e => console.log("Posts Error Handler: ", e.message));
    // }, [])

    return (
        posts.map(post =>
        <Post
            key={post._id}
            {...post}
        />
    ))

}

export default Posts;