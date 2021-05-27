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

const postsService = {
    getAll,
    create
}

export default postsService;