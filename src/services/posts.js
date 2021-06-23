import config from '../config';
const { baseURL } = config;

function getAllPosts() {
    return fetch(`${baseURL}/posts`, {
        method: 'GET',
        credentials: "include",
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not get posts!');
            }
            return res.json()
        })
        .catch(e => console.log("Error from postsService: ", e.message));
}

function getPost(postId) {
    return fetch(`${baseURL}/posts/${postId}`, {
        method: 'GET',
        credentials: "include",
    })
        .then(res => {
            return res.json()
        })
        .catch(e => console.log("Error from postsService: ", e.message));
}

function createPost(post) {
    return fetch(`${baseURL}/posts`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(post)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not create post!');
            }
            return res.json()
        })
        .catch(e => console.log("Error from postsService: ", e.message));
}

function editPost(postId, currentValue) {
    return fetch(`${baseURL}/posts/${postId}`, {
        method: 'PUT',
        credentials: "include",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentValue)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not update post !');
            }
            return res.json();
        })
        .catch(e => console.log("Error from postsService: ", e.message));
}

function deletePost(postId) {
    return fetch(`${baseURL}/posts/${postId}`, {
        method: 'DELETE',
        credentials: "include",
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not delete post !');
            }
            return res.json();
        })
        .catch(e => console.log("Error from postsService: ", e.message));
}


const postsService = {
    getAllPosts,
    getPost,
    createPost,
    editPost,
    deletePost
}

export default postsService;