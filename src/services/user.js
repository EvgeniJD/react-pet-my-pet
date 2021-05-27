import constants from '../constants';
const { baseURL } = constants;

function register(user) {
    return fetch(`${baseURL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: "include"
    })
        .then(res => res.json())
        .catch(e => console.log(e.message))
}

function login(user) {
    return fetch(`${baseURL}/login`, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
        credentials: "include",
    })
        .then(res => res.json())
        .catch(e => console.log("Error Message is: ", e.message))
}

const userService = {
    register,
    login
}

export default userService;