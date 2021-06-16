import constants from '../constants';
const { baseURL } = constants;

function getAllPosts() {
    return fetch(`${baseURL}/posts`, {
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
    const updateKey = Object.keys(currentValue)[0];

    if (updateKey === 'likes' || updateKey === 'dislikes') {
        currentValue[updateKey] += 1;
    }

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


const postsService = {
    getAllPosts,
    createPost,
    editPost,
}

export default postsService;