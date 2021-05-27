import { useState, useEffect } from 'react';
import Post from './Post';
import postsService from '../../services/posts';

function Posts() {

    const [ posts, setPosts ] = useState([]);

    useEffect(() => {
        postsService.getAll()
            .then(posts => {
                setPosts(posts)
            })
            .catch(e => console.log("Posts Error Handler: ", e.message));
    }, [])

    return (
        posts.map(post =>
        <Post
            key={post._id}
            {...post}
        />
    ))

}

export default Posts;