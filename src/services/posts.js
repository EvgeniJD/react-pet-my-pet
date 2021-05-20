import baseURL from '../constants';

function getAll() {
    return fetch(baseURL)
    .then(res => res.json())
    .catch(e => console.log("Error from postsService: ", e.message))
}

const postsService = {
    getAll
}

export default postsService;