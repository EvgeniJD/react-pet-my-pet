import config from '../config';
const { baseURL } = config;

console.log('Config: ', config);

function register(user) {
    return fetch(`${baseURL}/user/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://amica-b2b6c.web.app'
        },
        body: JSON.stringify(user),
        credentials: "include"
    })
        .then(res => res.json())
        .catch(e => console.log(e.message))
}

function login(user) {
    return fetch(`${baseURL}/user/login`, {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://amica-b2b6c.web.app'
        },
        body: JSON.stringify(user),
        credentials: "include",
    })
        .then(res => res.json())
        .catch(e => console.log("Error Message is: ", e.message))
}

function logout() {
    return fetch(`${baseURL}/user/logout`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://amica-b2b6c.web.app'
        },
    })
        .then(res => res.json())
        .catch(e => console.log("Error Message is: ", e.message))
}

function checkAuth() {
    return fetch(`${baseURL}/user/check-auth`, {
        credentials: "include",
        headers: {
            'Access-Control-Allow-Origin': 'https://amica-b2b6c.web.app',
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('You are not authorized!');
            }
            return res.json();
        })
        .catch(e => console.log("Error Message is: ", e.message))
}

function getUser(id) {
    return fetch(`${baseURL}/user/${id}`, {
        credentials: "include",
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://amica-b2b6c.web.app'
        },
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not get user !');
            }

            return res.json();
        })
        .catch(e => console.log("Error Message is: ", e.message))
}

function editUser(userId, data) {
    return fetch(`${baseURL}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'https://amica-b2b6c.web.app'
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not edit user !');
            }

            return res.json();
        })
        .catch(e => console.log(e.message))
}


const userService = {
    register,
    login,
    logout,
    checkAuth,
    getUser,
    editUser
}

export default userService;