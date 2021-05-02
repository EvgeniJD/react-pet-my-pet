import Post from './Post';
import posts from '../../data/posts';

function Posts() {
    return (posts.map(post => 
            <Post 
            key={post.id}
            comment={post.comment}
            avatar={post.avatar} 
            />
        ))
    
}

export default Posts;