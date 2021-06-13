import constants from '../constants';
const { baseURL } = constants;

function register(user) {
    return fetch(`${baseURL}/user/register`, {
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
    return fetch(`${baseURL}/user/login`, {
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

function logout() {
    return fetch(`${baseURL}/user/logout`, {
        credentials: "include",
    })
        .then(res => res.json())
        .catch(e => console.log("Error Message is: ", e.message))
}

function checkAuth() {
    return fetch(`${baseURL}/user/check-auth`, {
        credentials: "include",
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
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Can not get user !');
            }

            return res.json();
        })
        .catch(e => console.log("Error Message is: ", e.message))
}

function updateUser(userId, data, endPoint) {
    if(endPoint) {
       return updateUserLikesOrDislikes(userId, data, endPoint);
    } else {
        return updatePersonalnfo(userId, data);
    }
}

function updatePersonalnfo(userId, data) {
    return fetch(`${baseURL}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: "include"
    })
        .then(res => res.json())
        .catch(e => console.log(e.message))
}

function updateUserLikesOrDislikes(userId, data, endPoint) {
    return fetch(`${baseURL}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({endPoint ,...data}),
        credentials: "include"
    })
        .then(res => { 
           if(!res.ok) {
               throw new Error('There is a problem with update user likes or dislikes!')
           } 
           
           return res.json()
        })
        .catch(e => console.log(e.message))
}


const userService = {
    register,
    login,
    logout,
    checkAuth,
    getUser,
    updateUser
}

export default userService;