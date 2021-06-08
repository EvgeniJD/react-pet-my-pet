import constants from '../constants';
const { baseURL } = constants;

function getAll() {
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

function create(post) {
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

function updatePost(_id, currentValue) {
    const updateKey = Object.keys(currentValue)[0];
    currentValue[updateKey] += 1;

    return fetch(`${baseURL}/posts/${_id}`, {
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
    getAll,
    create,
    updatePost
}

export default postsService;