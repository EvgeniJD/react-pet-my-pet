import constants from '../constants';
const { baseURL } = constants;

function register(user) {
    return fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user)
    })
    .then(res => res.json())
    .catch(e => console.log(e.message))
}

const userService = {
    register
}

export default userService;